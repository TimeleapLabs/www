import { macros as cadeyMacros } from "cadey/generator.js";
import slugify from "slugify";

import fs from "fs";
import path from "path";

import { asText, asArgList, unIndent, toUrl } from "./utils.js";
import { arrayOrNotWhite, removeWhites } from "./utils.js";

export const slug = (str) => slugify(str, { lower: true, strict: true });

const isMultiValue = (arg, expect) => {
  if (arg.filter(arrayOrNotWhite).length > expect) {
    return true;
  }
  for (const item of arg) {
    if (Array.isArray(item)) {
      for (const inner of item) {
        if (Array.isArray(inner)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const macros = {
  ...cadeyMacros,
  table(options, ..._args) {
    this.components = { ...this.components, Table: true };
    const header = options.header
      .filter(Boolean)
      .filter(arrayOrNotWhite)
      .map(asText);

    const rowsFromOptions = isMultiValue(options.row, header.length)
      ? options.row
      : [options.row];

    const rows = rowsFromOptions
      .filter(Boolean)
      .filter(arrayOrNotWhite)
      .map((row) => row.filter(arrayOrNotWhite))
      .map((row) => row.map(asText));

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
  },
  tab(options, ...args) {
    const { title } = options;
    const content = asText(args);
    this.tabs = [...(this.tabs || []), { title: asText(title), content }];
  },
  list(options, ...args) {
    const { type = "unordered" } = options;
    const items = args
      .filter((arg) => typeof arg != "string" || !arg.match(/^[ \n]+$/))
      .map((arg) => (Array.isArray(arg) ? arg.join("") : arg))
      .map((item) => item.split(/\n\s*?\n/g))
      .map((item) => item.filter(removeWhites))
      .map((item) => item.map((line) => `<div> ${line} </div>`))
      .map((item) => item.join("\n"))
      .map((item) => `<ListItem> ${item} </ListItem>`)
      .join("\n");
    const el = type == "unordered" ? "UnorderedList" : "OrderedList";
    if (type === "unordered") {
      this.components = { ...this.components, List: true };
    } else {
      this.components = { ...this.components, Toc: true };
    }
    return `<${el}> ${items} </${el}>`;
  },
  link(options, ...args) {
    const [href, ...text] = args.slice(1);
    const local = href.startsWith("https://kenshi.io") || href.startsWith("/");
    const component = local ? "Link" : "OutboundLink";
    const content = text ? asText(text) : href;
    return `<${component} href="${href}">${content}</${component}>`;
  },
  image(options, ...args) {
    this.components = { ...this.components, Image: true };

    const { width, height } = options;
    const [src, ...alt] = args.filter((arg) => !arg.match(/^\s+$/));

    const atts = [];
    if (width) atts.push(`width="${width}px"`);
    if (height) atts.push(`height="${height}px"`);

    atts.push(`src="${src}"`);
    this.images = [...(this.images || []), src];

    if (options.alt) {
      atts.push(`alt="${asText(options.alt)}"`);
    } else if (alt) {
      atts.push(`alt="${asText(alt)}"`);
    }

    return `<Image ${atts.join(" ")} />`;
  },
  gallery(options, ...args) {
    this.components = { ...this.components, Gallery: true };
    const { gap = "1em" } = options;
    const inner = asText(args);
    return `<Gallery gap={"${gap}"}>${inner}</Gallery>`;
  },
  team(_, ...args) {
    const inner = asText(args);
    return `
      <Grid noGutter fullWidth padding>
        <Row>
          ${inner}
        </Row>
      </Grid>`;
  },
  teamMember(options, ...args) {
    this.components = { ...this.components, TeamMember: true };
    const { name, photo, linkedIn, github, twitter, medium } = options;
    const inner = asText(args);

    let tags = `name={"${asText(name)}"} photo={"${asText(photo)}"}`;
    if (linkedIn) tags += ` linkedIn={"${asText(linkedIn)}"}`;
    if (github) tags += ` github={"${asText(github)}"}`;
    if (twitter) tags += ` twitter={"${asText(twitter)}"}`;
    if (medium) tags += ` medium={"${asText(medium)}"}`;

    return `<TeamMember ${tags}>${inner}</TeamMember>`;
  },
  tabs() {
    this.components = { ...this.components, Tab: true };
    const titles = this.tabs.map((tab) => `<Tab>${tab.title}</Tab>`).join("");
    const contents = this.tabs
      .map((tab) => `<TabContent>${tab.content}</TabContent>`)
      .join("");
    this.tabs = [];
    return `
      <div class="condensed-tabs">
        <Tabs>
          ${titles}
          <svelte:fragment slot="content">
            ${contents}
          </svelte:fragment>
        </Tabs>
      </div>`;
  },
  code(options, ...args) {
    this.components = { ...this.components, Code: true };
    const { content } = options;
    const code = content
      ? fs
          .readFileSync(content.trim())
          .toString()
          .replace(/`/g, "\\`")
          .replace(/{/g, "\\{")
      : unIndent(asText(args)).replace(/`/g, "\\`").replace(/{/g, "\\{");

    const type = code.includes("\n") ? "multi" : "single";
    return `<CodeSnippet type={"${type}"} code={\`${code}\`}></CodeSnippet>`;
  },
  async toc(_options, ...args) {
    this.components = { ...this.components, Toc: true };
    const files = asArgList(args).map((name) =>
      path.join(path.dirname(this.currentFile), `${name}.cadey`)
    );
    await Promise.all(files.map((file) => this.processOne(file)));
    const headings = {};
    for (const file of files) {
      headings[file] = this.allHeadings[file][0].title;
    }
    this.allTocs[this.currentFile] = headings;
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
  },
  heading(options, ...args) {
    const { size = 1, hint = "" } = options;

    const title = asText(args);
    const anchor = slug(title);

    this.headings = [...(this.headings || []), { title, hint: asText(hint) }];
    this.allHeadings[this.currentFile] = this.headings;

    return `
      <ExpressiveHeading size={${5 - Number(size)}}>
        <h${size} id="${anchor}">
          <Link href="#${anchor}">
            ${title}
          </Link>
        </h${size}>
      </ExpressiveHeading>
      `;
  },
  chart(options, ..._args) {
    this.components = { ...this.components, Chart: true };
    const { data, title } = options;
    const chartData = fs.readFileSync(data.trim()).toString();
    const titleTag = title ? `"${asText(title)}"` : null;
    return `<Chart title={${titleTag}} data={${chartData}} />`;
  },
  alert(_options, ...args) {
    const [type, ...text] = args.slice(1);
    this.components = { ...this.components, Alert: true };
    return `
      <InlineNotification hideCloseButton kind={"${type}"}>
        <div slot="subtitle">${asText(text)}</div>
      </InlineNotification>`;
  },
};
