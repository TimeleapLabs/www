import { macros as cadeyMacros } from "cadey/generator.js";

import pygments from "pygments";
import fs from "fs";
import path from "path";

import { asText, asArgList, unIndent, getLang, toUrl } from "./utils.js";

const { heading } = cadeyMacros;

const alertIcons = {
  warning: "TriangleExclamation",
  info: "CircleInfo",
  note: "Pencil",
  success: "CircleCheck",
};

export const macros = {
  ...cadeyMacros,
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
      : unIndent(args.join(""));
    const getLangName = () => getLang(asText(content));
    const langName = language || (content ? getLangName() : "");
    const highlighted = pygments
      .colorizeSync(code, langName)
      .replace(/{/g, "&#123;")
      .replace(/}/g, "&#125;");
    const download = content ? `"${content.replace(/^static/, "")}"` : null;
    return `<Code title={"${title}"} download={${download}}>${highlighted}</Code>`;
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
