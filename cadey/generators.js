import { slug } from "./utils.js";

export const getHeadings = (headings) =>
  headings.map((h) => `<a href="#${slug(h)}"> ${h} </a>`).join("\n");

const componentsMap = {
  Alert: "src/components/Alert.svelte",
  Code: "src/components/Code.svelte",
  Table: "src/components/Table.svelte",
  TriangleExclamation: "src/icons/TriangleExclamation.svelte",
  CircleInfo: "src/icons/CircleInfo.svelte",
  Pencil: "src/icons/Pencil.svelte",
  CircleCheck: "src/icons/CircleCheck.svelte",
  Tab: "src/components/tabs/Tab.svelte",
  Tabs: "src/components/tabs/Tabs.svelte",
  TabList: "src/components/tabs/TabList.svelte",
  TabPanel: "src/components/tabs/TabPanel.svelte",
  Image: "src/components/gallery/Image.svelte",
  Gallery: "src/components/gallery/Gallery.svelte",
};

export const getImports = (components = {}) =>
  Object.keys(components)
    .map((c) => `import ${c} from "${componentsMap[c]}"`)
    .join(";\n");

export const getDocPage = (parsed, imports, headings, next, prev) => `
    <script>
      import DocPage from "src/components/DocPage.svelte";
      ${imports};
      const next = ${next};
      const prev = ${prev};
    </script>
    <DocPage {next} {prev}>
      ${parsed}
      <div slot="headings">${headings}</div>
    </DocPage>
  `;

export const getContext = (
  cadey,
  processOne,
  currentFile,
  allHeadings,
  allTocs
) => ({
  ...cadey.getContext(),
  processOne,
  currentFile,
  allHeadings,
  allTocs,
});
