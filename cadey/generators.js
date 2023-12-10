import { slug } from "./utils.js";

export const getHeadings = (headings) =>
  headings
    .map((h) => `<Link href="#${slug(h.title)}">${h.title}</Link>`)
    .map((l) => `<ListItem>${l}</ListItem>`)
    .join("\n");

const componentsMap = {
  Alert: 'import { InlineNotification } from "carbon-components-svelte"',
  Toc: 'import { OrderedList } from "carbon-components-svelte"',
  List: 'import { UnorderedList } from "carbon-components-svelte"',
  Code: 'import { CodeSnippet } from "carbon-components-svelte"',
  Table: 'import { DataTable } from "carbon-components-svelte"',
  Tab: 'import { Tabs, Tab, TabContent, Tile } from "carbon-components-svelte"',
  Image: "src/components/gallery/Image.svelte",
  Gallery: "src/components/gallery/Gallery.svelte",
  TeamMember: "src/components/TeamMember.svelte",
  Chart: "src/components/Chart.svelte",
  Donut: "src/components/docs/Donut.svelte",
  Audio: "src/components/Audio.svelte",
  BlogToc: 'import Toc from "src/components/blog/Toc.svelte"',
};

const getImport = (c) =>
  componentsMap[c].startsWith("import")
    ? componentsMap[c]
    : `import ${c} from "${componentsMap[c]}"`;

export const getImports = (components = {}) =>
  Object.keys(components).map(getImport).join(";\n");

const genBread = (bread) => {
  const lastBread = bread.pop();
  const lastItem = `<BreadcrumbItem href="${lastBread.url}"
    isCurrentPage>${lastBread.title}</BreadcrumbItem>`;
  const items = bread
    .map((c) => `<BreadcrumbItem href="${c.url}">${c.title}</BreadcrumbItem>`)
    .join("\n");
  return `<Breadcrumb noTrailingSlash>${items}\n${lastItem}</Breadcrumb>`;
};

export const getPage = (
  parsed,
  imports,
  headings,
  bread,
  next,
  prev,
  tags,
  meta,
  type
) => `
    <script>
      import ${type}Page from "src/components/${type}Page.svelte";
      import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
      import { Grid, Row, Column, Link, OutboundLink } from "carbon-components-svelte";
      import { ListItem } from "carbon-components-svelte";
      import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
      ${imports};

      const next = ${next};
      const prev = ${prev};
      const meta = ${JSON.stringify(meta)};
    </script>

    <svelte:head>
      ${tags}
    </svelte:head>

    <${type}Page {next} {prev} {meta}>
      ${parsed}
      <svelte:fragment slot="breadcrumb">${genBread(bread)}</svelte:fragment>
      <svelte:fragment slot="headings">${headings}</svelte:fragment>
    </${type}Page>
  `;

export const getContext = (
  cadey,
  processOne,
  currentFile,
  allHeadings,
  allTocs,
  allMeta
) => ({
  ...cadey.getContext(),
  processOne,
  currentFile,
  allHeadings,
  allTocs,
  allMeta,
});
