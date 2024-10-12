import {
  FunctionCall,
  PureText,
  MixedText,
  Tiramisu,
  Paragraph,
  Parameters,
  NamedParameter,
  Parameter,
  ArrayValue,
  ArrayItem,
} from "@timeleap/tiramisu/dist/types/nodes.js";

import { slug, unIndent, toUrl } from "./utils.js";

import path from "path";
import fs from "fs";

const asyncReduce = async (arr, reducer, initialValue) => {
  let acc = initialValue;
  for (const item of arr) {
    acc = await reducer(acc, item);
  }
  return acc;
};

const getNamedParamsAsDict = async (
  /** @type {Parameters} */ parameters,
  context
) =>
  asyncReduce(
    parameters.parameters,
    async (acc, param) => {
      if (param instanceof NamedParameter) {
        acc[param.name] = await translate(param.value[0], context);
      }
      return acc;
    },
    {}
  );

const getRestParams = (/** @type {Parameters} */ parameters, context) =>
  translateArray(
    parameters.parameters.filter((param) => param instanceof Parameter),
    context
  );

const getRestAsText = async (/** @type {Parameters} */ parameters, context) =>
  (await getRestParams(parameters, context)).join(", ");

const heading = async (/** @type {Parameters} */ parameters, context) => {
  const params = await getNamedParamsAsDict(parameters, context);
  const title = await getRestAsText(parameters, context);

  const anchor = slug(title);

  context.headings = [
    ...(context.headings ?? []),
    { title, hint: params.hint || "" },
  ];
  context.allHeadings[context.currentFile] = context.headings;

  return `
      <ExpressiveHeading size={${5 - Number(params.level)}}>
        <h${params.level} id="${anchor}">
          <Link href="#${anchor}">
            ${title}
          </Link>
        </h${params.level}>
      </ExpressiveHeading>
      `;
};

const list = async (/** @type {Parameters} */ parameters, context) => {
  const params = await getNamedParamsAsDict(parameters, context);
  const mapped = parameters.parameters.map(async (param) => {
    if (param instanceof NamedParameter && param.name == "item") {
      return Array.isArray(param.value)
        ? (await translateArray(param.value, context)).join(" ")
        : await translate(param.value, context);
    } else if (param instanceof Parameter) {
      return await translate(param, context);
    }
  });
  const resolved = await Promise.all(mapped);
  const items = resolved
    .map((item) => `<ListItem> ${item} </ListItem>`)
    .join("\n");

  const el = params.type === "unordered" ? "UnorderedList" : "OrderedList";

  if (params.type === "unordered") {
    context.components = { ...context.components, List: true };
  } else {
    context.components = { ...context.components, Toc: true };
  }

  return `<${el}> ${items} </${el}>`;
};

const link = async (/** @type {Parameters} */ parameters, context) => {
  const href = await translate(parameters.parameters[0], context);
  const text = (
    await translateArray(parameters.parameters.slice(1), context)
  ).join(", ");

  const local =
    href.startsWith("https://kenshi.io") ||
    href.startsWith("https://timeleap.swiss") ||
    href.startsWith("/");

  const component = local ? "Link" : "OutboundLink";
  const content = text || href;

  return `<${component} href="${href}">${content}</${component}>`;
};

const alert = async (/** @type {Parameters} */ parameters, context) => {
  const params = await getNamedParamsAsDict(parameters, context);

  const type =
    params.type || (await translate(parameters.parameters[0], context));

  const text = (
    await translateArray(
      params.type ? parameters.parameters.slice(1) : parameters.parameters,
      context
    )
  ).join(", ");

  context.components = { ...context.components, Alert: true };

  return `
      <InlineNotification hideCloseButton kind={"${type}"}>
        <div slot="subtitle">${text}</div>
      </InlineNotification>`;
};

const toc = async (/** @type {Parameters} */ parameters, context) => {
  context.components = { ...context.components, Toc: true };
  const fileNames = await translateArray(parameters.parameters, context);
  const files = fileNames
    .map((name) => name.trim())
    .map((name) =>
      path.join(path.dirname(context.currentFile), `${name}.tiramisu`)
    );

  for (const file of files) {
    if (!context.allHeadings[file]) {
      await context.processOne(file);
    }
  }

  const headings = {};
  for (const file of files) {
    headings[file] = context.allHeadings[file][0].title;
  }

  context.allTocs[context.currentFile] = headings;

  if (context.type === "blog") {
    context.components = { ...context.components, BlogToc: true };
    return "<Toc />";
  }

  const links = Object.entries(headings)
    .map(([file, title]) => [toUrl(file), title])
    .map(([url, title]) => `<Link href="${url}"> ${title} </Link>`)
    .map((a) => `<ListItem>${a}</ListItem>`)
    .join("\n");

  return `
      <div class="toc">
        <ExpressiveHeading size={3}>
          <h5> Table of Contents </h5>
        </ExpressiveHeading>
        <OrderedList>${links}</OrderedList>
      </div>`;
};

const team = async (/** @type {Parameters} */ parameters, context) => {
  const inner = (await translateArray(parameters.parameters, context)).join(
    " "
  );
  return `
      <Grid noGutter fullWidth padding>
        <Row>
          ${inner}
        </Row>
      </Grid>`;
};

const gallery = async (/** @type {Parameters} */ parameters, context) => {
  context.components = { ...context.components, Gallery: true };
  const { gap = "1em" } = await getNamedParamsAsDict(parameters, context);
  const inner = await getRestAsText(parameters, context);
  return `<Gallery gap={"${gap}"}>${inner}</Gallery>`;
};

const code = async (/** @type {Parameters} */ parameters, context) => {
  context.components = { ...context.components, Code: true };
  const { content, inline } = await getNamedParamsAsDict(parameters, context);
  const code = content
    ? fs
        .readFileSync(content.trim())
        .toString()
        .replace(/`/g, "\\`")
        .replace(/{/g, "\\{")
    : unIndent(await getRestAsText(parameters, context))
        .replace(/`/g, "\\`")
        .replace(/{/g, "\\{");

  const type = inline ? "inline" : code.includes("\n") ? "multi" : "single";
  return `<CodeSnippet type={"${type}"} code={\`${code}\`}></CodeSnippet>`;
};

const donut = async (/** @type {Parameters} */ parameters, context) => {
  parameters.components = { ...parameters.components, Donut: true };
  const { data, label, title } = await getNamedParamsAsDict(
    parameters,
    context
  );

  const chartData = fs.readFileSync(data.trim()).toString();
  const labelTag = label ? `"${label}"` : null;
  const titleTag = title ? `"${title}"` : null;

  return `<Donut label={${labelTag}} title={${titleTag}} data={${chartData}} />`;
};

const audio = async (/** @type {Parameters} */ parameters, context) => {
  parameters.components = { ...parameters.components, Audio: true };
  const { file } = await getNamedParamsAsDict(parameters, context);
  return `<Audio file="${file.trim(" ")}"/>`;
};

const image = async (/** @type {Parameters} */ parameters, context) => {
  parameters.components = { ...parameters.components, Image: true };

  const params = await getNamedParamsAsDict(parameters, context);
  const [src, ...alt] = await getRestParams(parameters, context);

  const atts = [];
  if (params.width) atts.push(`width="${params.width}px"`);
  if (params.height) atts.push(`height="${params.height}px"`);

  atts.push(`src="${src}"`);
  context.images = [...(context.images || []), src];

  if (params.alt) {
    atts.push(`alt="${params.alt}"`);
  } else if (alt) {
    atts.push(`alt="${alt.join(", ")}"`);
  }

  if (params.sm) {
    atts.push(`sm={${params.sm}}`);
  }
  if (params.lg) {
    atts.push(`lg={${params.lg}}`);
  }
  if (params.md) {
    atts.push(`md={${params.md}}`);
  }
  if (params.ar) {
    atts.push(`aspectRatio="${params.ar}"`);
  }

  return `<Image ${atts.join(" ")} />`;
};

const table = async (/** @type {Parameters} */ parameters, context) => {
  context.components = { ...context.components, Table: true };
  const params = await getNamedParamsAsDict(parameters, context);
  const header = await translateArray(params.header, context);
  const rows = await Promise.all(
    parameters.parameters
      .filter((p) => p.name === "row")
      .map(async (p) =>
        Array.isArray(p.value)
          ? await translateArray(p.value, context)
          : await translate(p.value, context)
      )
  );

  const headerSlugs = header.map(slug);

  const headersJson = JSON.stringify(
    header.map((value, i) => ({ key: headerSlugs[i], value }))
  );

  const rowsJson = JSON.stringify(
    rows.map((row, id) =>
      Object.fromEntries([
        ["id", id],
        ...row.map((value, i) => [headerSlugs[i], value]),
      ])
    )
  );

  return `<DataTable headers={${headersJson}} rows={${rowsJson}} />`;
};

const italic = async (/** @type {Parameters} */ parameters, context) => {
  const inner = await getRestAsText(parameters, context);
  return `<i>${inner}</i>`;
};

const bold = async (/** @type {Parameters} */ parameters, context) => {
  const inner = await getRestAsText(parameters, context);
  return `<b>${inner}</b>`;
};

const underline = async (/** @type {Parameters} */ parameters, context) => {
  const inner = await getRestAsText(parameters, context);
  return `<u>${inner}</u>`;
};

const mermaid = async (/** @type {Parameters} */ parameters, context) => {
  context.components = { ...context.components, Mermaid: true };
  const code = await getRestAsText(parameters, context);
  const { id, title, description } = getNamedParamsAsDict(parameters, context);
  const titleTag = title ? `"${title}"` : null;
  const idTag = id ? `"${id}"` : null;
  const descriptionTag = description ? `"${description}"` : null;
  return `
    <Mermaid id={${idTag}} description={${descriptionTag}} title={${titleTag}}>
      ${unIndent(code).replace(/`/g, "\\`").replace(/{/g, "\\{")}
    </Mermaid>`;
};

const functions = {
  heading,
  list,
  link,
  alert,
  toc,
  team,
  gallery,
  code,
  donut,
  audio,
  image,
  table,
  italic,
  bold,
  underline,
  mermaid,
};

export const translateArray = async (nodes, context) =>
  Promise.all(nodes.map((node) => translate(node, context)));

export const translate = async (node, context) => {
  if (node instanceof Tiramisu) {
    return (await translateArray(node.children, context)).join(" ");
  } else if (node instanceof Paragraph) {
    return (await translateArray(node.children, context)).join(" ");
  } else if (node instanceof MixedText) {
    return (await translateArray(node.shards, context)).join(" ");
  } else if (node instanceof PureText) {
    return node.toString();
  } else if (node instanceof Parameter) {
    return node.toString();
  } else if (node instanceof ArrayValue) {
    return await translateArray(node.values, context);
  } else if (node instanceof ArrayItem) {
    return (await translateArray(node.value, context)).join(" ");
  } else if (node instanceof FunctionCall) {
    const found = functions[node.functionName];
    if (found) {
      return found(node.parameters, context);
    } else {
      throw new Error(`Unknown function: ${node.functionName}`);
    }
  } else if (typeof node == "string") {
    return node;
  } else {
    throw new Error(`Unknown node type: ${node.constructor.name}`);
  }
};
