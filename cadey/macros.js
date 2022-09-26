import { macros as cadeyMacros } from "cadey/generator.js";

import pygments from "pygments";
import fs from "fs";
import path from "path";

import { asText, asArgList, unIndent, getLang, toUrl } from "./utils.js";
import { arrayOrNotWhite } from "./utils.js";

const { heading } = cadeyMacros;

const alertIcons = {
  warning: "TriangleExclamation",
  info: "CircleInfo",
  note: "Pencil",
  success: "CircleCheck",
};

const tableHead = (items) =>
  "<tr>" + items.map((item) => `<th>${item}</th>`).join("\n") + "</tr>";

const tableRow = (items) =>
  "<tr>" + items.map((item) => `<td>${item}</td>`).join("\n") + "</tr>";

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
    const sizes = options.sizes
      ? options.sizes.filter(arrayOrNotWhite)
      : header.map(() => "1fr");
    return `
      <Table sizes={${JSON.stringify(sizes)}}>
        <thead>${tableHead(header)}</thead>
        <tbody>${rows.map(tableRow).join("\n")}</tbody>
      </Table>
    `;
  },
  tab(options, ...args) {
    const { title } = options;
    const content = asText(args);
    this.tabs = [...(this.tabs || []), { title: asText(title), content }];
  },
  image(options, ...args) {
    this.components = { ...this.components, Image: true };

    const { width, height } = options;
    const [src, ...alt] = args.filter((arg) => !arg.match(/^\s+$/));

    const atts = [];
    if (width) atts.push(`width="${width}px"`);
    if (height) atts.push(`height="${height}px"`);
    atts.push(`src="${src}"`);

    if (options.alt) {
      atts.push(`alt="${asText(options.alt)}"`);
    } else if (alt) {
      atts.push(`alt="${asText(alt)}"`);
    }

    return `<Image ${atts} />`;
  },
  gallery(options, ...args) {
    this.components = { ...this.components, Gallery: true };
    const inner = asText(args);
    return `<Gallery>${inner}</Gallery>`;
  },
  grid(options, ...args) {
    this.components = { ...this.components, Grid: true };
    const cols = asText(options.cols || "1fr 1fr");
    const gap = asText(options.gap || "1em");
    const inner = asText(args);
    return `<Grid cols={"${cols}"} gap={"${gap}"}>${inner}</Grid>`;
  },
  team(options, ...args) {
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
    this.components = {
      ...this.components,
      Tab: true,
      Tabs: true,
      TabList: true,
      TabPanel: true,
    };
    const titles = this.tabs.map((tab) => `<Tab>${tab.title}</Tab>`).join("");
    const contents = this.tabs
      .map((tab) => `<TabPanel>${tab.content}</TabPanel>`)
      .join("");
    this.tabs = [];
    return `<Tabs><TabList>${titles}</TabList>${contents}</Tabs>`;
  },
  code(options, ...args) {
    this.components = { ...this.components, Code: true };
    const { language, content, title } = options;
    const code = content
      ? fs.readFileSync(content.trim()).toString()
      : unIndent(asText(args));
    const getLangName = () => getLang(asText(content));
    const langName = language || (content ? getLangName() : "");
    const highlighted = pygments
      .colorizeSync(code, langName)
      .replace(/{/g, "&#123;")
      .replace(/}/g, "&#125;");
    const download = content ? `"${content.replace(/^static/, "")}"` : null;
    const titleTag = title ? `"${title}"` : null;
    return `<Code title={${titleTag}} download={${download}}>${highlighted}</Code>`;
  },
  async toc(_options, ...args) {
    const files = asArgList(args).map((name) =>
      path.join(path.dirname(this.currentFile), `${name}.cadey`)
    );
    await Promise.all(files.map((file) => this.processOne(file)));
    const headings = {};
    for (const file of files) {
      headings[file] = this.allHeadings[file][0];
    }
    this.allTocs[this.currentFile] = headings;
    const links = Object.entries(headings)
      .map(([file, title]) => [toUrl(file), title])
      .map(([url, title]) => `<a href="${url}"> ${title} </a>`)
      .map((a) => `<li>${a}</li>`)
      .join("\n");
    return `
      <div class="toc">
        <h5> Table of Contents </h5>
        <ul>${links}</ul>
      </div>`;
  },
  heading(options, ...args) {
    this.headings = [...(this.headings || []), asText(args)];
    this.allHeadings[this.currentFile] = this.headings;
    return heading.call(this, options, ...args);
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
    const iconName = alertIcons[type];
    this.components = { ...this.components, Alert: true, [iconName]: true };
    return `
      <Alert ${type}>
        <div class="icon"><${iconName}/></div>
        <div class="message">${asText(text)}</div>
      </Alert>`;
  },
};
