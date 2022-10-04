import { Cadey, rules } from "cadey/generator.js";
import { parse } from "cadey/parser.js";

import fs from "fs";
import path from "path";

import { macros } from "./cadey/macros.js";
import { getNav, getNext, getPrev } from "./cadey/nav.js";
import { getHeadings, getImports } from "./cadey/generators.js";
import { getDocPage, getContext } from "./cadey/generators.js";
import { getSeoTags } from "./cadey/seo.js";

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
  for (const file in processed) {
    const { parsed, context } = processed[file];
    const tags = getSeoTags(parsed, context);
    const imports = getImports(context.components);
    const headings = getHeadings(context.headings);
    const next = getNext(file, allTocs);
    const prev = getPrev(file, allTocs, allHeadings);
    const code = getDocPage(parsed, imports, headings, next, prev, tags);
    const dirname = file.replace(/(index)?\.cadey$/, "");
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
};

parseAll();
