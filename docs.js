import { Cadey, rules, macros } from "cadey/generator.js";
import { parse } from "cadey/parser.js";
import prettier from "prettier";

import fs from "fs";
import path from "path";

const cadey = new Cadey({ parse, macros, rules });

const asText = (arr) => {
  if (typeof arr == "string") return arr;
  return arr.map(asText).join("").trim();
};

cadey.addMacros({
  alert(options, ...args) {
    this.components = { ...this.components, Alert: true };
    const [type, ...text] = args.slice(1);
    return `<Alert ${type}>${asText(text)}</Alert>`;
  },
});

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
  for (const file of walkSync("./src/routes/docs")) {
    if (file.endsWith(".cadey")) {
      const content = fs.readFileSync(file).toString();
      const cst = await cadey.parse(content);
      const context = cadey.getContext();
      const parsed = await cadey.parseCST(cst, context);
      const imports = Object.keys(context.components)
        .map((c) => `import ${c} from "src/components/${c}.svelte"`)
        .join(";\n");
      const code = `<script>${imports}</script>${parsed}`;
      const pretty = prettier.format(code, {
        parser: "svelte",
        plugins: ["prettier-plugin-svelte"],
      });
      fs.writeFileSync(file.replace(".cadey", ".svelte"), pretty);
    }
  }
};

parseAll();
