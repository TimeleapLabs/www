import { Cadey, rules } from "cadey/generator.js";
import { parse } from "cadey/parser.js";

const { block } = rules;

rules.block = async function (...args) {
  return `<Row><Column>${await block.call(this, ...args)}</Column></Row>`;
};

import fs from "fs";
import path from "path";

import { macros } from "./cadey/macros.js";
import { getNav, getNext, getPrev, getBreadCrumb } from "./cadey/nav.js";
import { getHeadings, getImports } from "./cadey/generators.js";
import { getDocPage, getContext } from "./cadey/generators.js";
import { getSeoTags, getTextContent } from "./cadey/seo.js";

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

const parseAll = async () => {
  const processed = {};
  const allHeadings = {};
  const allTocs = {};
  const processOne = async (file) => {
    if (file.endsWith(".cadey") && !processed[file]) {
      console.log(`Processing ${file}`);
      const content = fs.readFileSync(file).toString();
      const cst = await cadey.parse(content);
      const context = getContext(cadey, processOne, file, allHeadings, allTocs);
      const parsed = await cadey.parseCST(cst, context);
      processed[file] = { parsed, context };
    }
  };
  for (const file of walkSync("./src/routes/docs")) {
    await processOne(file);
  }
  const allTexts = [];
  for (const file in processed) {
    const { parsed, context } = processed[file];
    const tags = getSeoTags(parsed, context);
    const text = getTextContent(parsed);
    const imports = getImports(context.components);
    const headings = getHeadings(context.headings);
    const breadcrumb = getBreadCrumb(file, allHeadings);
    const next = getNext(file, allTocs);
    const prev = getPrev(file, allTocs, allHeadings);
    const code = getDocPage(
      parsed,
      imports,
      headings,
      breadcrumb,
      next,
      prev,
      tags
    );
    const dirname = file.replace(/(index)?\.cadey$/, "").replace(/\/$/, "");
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
  const nav = getNav(allTocs);
  fs.writeFileSync(
    "src/lib/docs.nav.js",
    `export default ${JSON.stringify(nav, null, 2)}`
  );
  fs.writeFileSync(
    "src/lib/docs.search.js",
    `export default ${JSON.stringify(allTexts, null, 2)}`
  );
};

parseAll();
