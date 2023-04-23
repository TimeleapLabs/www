import { Cadey, rules } from "cadey/generator.js";
import { parse } from "cadey/parser.js";

const { block: blockRule } = rules;

rules.block = async function (block, ...args) {
  block.content = block.content.filter((content) => content.type !== "meta");
  if (!block.content.length) {
    return "";
  }
  const generated = await blockRule.call(this, block, ...args);
  return `<Row><Column>${generated}</Column></Row>`;
};

import fs from "fs";
import path from "path";

import { macros } from "./macros.js";
import { getNav, getNext, getPrev, getBreadCrumb } from "./nav.js";
import { getHeadings, getImports } from "./generators.js";
import { getPage, getContext } from "./generators.js";
import { getSeoTags, getTextContent } from "./seo.js";

const cadey = new Cadey({ parse, macros, rules });

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

export const parseAll = async (project) => {
  const processed = {};
  const allHeadings = {};
  const allTocs = {};
  const allMeta = {};
  const processOne = async (file) => {
    if (file.endsWith(".cadey") && !processed[file]) {
      console.log(`Processing ${file}`);
      const content = fs.readFileSync(file).toString();
      const cst = await cadey.parse(content);
      const context = getContext(
        cadey,
        processOne,
        file,
        allHeadings,
        allTocs,
        allMeta
      );
      const parsed = await cadey.parseCST(cst, context);
      processed[file] = { parsed, context };
    }
  };
  for (const file of walkSync(`./src/routes/${project}`)) {
    await processOne(file);
  }
  const allTexts = [];
  for (const file in processed) {
    const { parsed, context } = processed[file];
    const meta = allMeta[file];
    const tags = getSeoTags(parsed, context, project);
    const text = getTextContent(parsed);
    const imports = getImports(context.components);
    const headings = getHeadings(context.headings);
    const breadcrumb = getBreadCrumb(file, allHeadings);
    const next = getNext(file, allTocs);
    const prev = getPrev(file, allTocs, allHeadings);
    const code = getPage(
      parsed,
      imports,
      headings,
      breadcrumb,
      next,
      prev,
      tags,
      meta,
      project === "docs" ? "Doc" : "Blog"
    );
    const dirname = file.replace(/(\/index)?\.cadey$/, "").replace(/\/$/, "");
    const url = "/" + dirname.slice("src/routes/".length);
    allTexts.push({
      text,
      breadcrumb: [...breadcrumb, { url, title: context.headings[0].title }],
    });
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    fs.writeFileSync(`${dirname}/+page.svelte`, code);
  }
  const nav = getNav(allTocs, allMeta, project);
  fs.writeFileSync(
    `src/lib/${project}.nav.js`,
    `export default ${JSON.stringify(nav, null, 2)}`
  );
  fs.writeFileSync(
    `src/lib/${project}.search.js`,
    `export default ${JSON.stringify(allTexts, null, 2)}`
  );
};
