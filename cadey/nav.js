import { toUrl } from "./utils.js";
import path from "path";

export const getParentTocI = (currDir, allTocs) => {
  const parentDir = path.dirname(currDir);
  const parentToc = allTocs[`${parentDir}/index.cadey`];
  if (!parentToc) {
    return {};
  }
  const parentTocEntries = Object.entries(parentToc);
  const parentTocI = parentTocEntries.findIndex(
    (item) => item[0] === `${currDir}/index.cadey`
  );
  return { parentToc: parentTocEntries, parentTocI };
};

export const getBreadCrumb = (file, allHeadings) => {
  const bread = [{ url: toUrl(file), title: allHeadings[file][0].title }];
  let parent = path.dirname(file);
  let index = `${parent}/index.cadey`;
  while (allHeadings[index]) {
    if (index !== file) {
      bread.unshift({ url: toUrl(parent), title: allHeadings[index][0].title });
    }
    parent = path.dirname(parent);
    index = `${parent}/index.cadey`;
  }
  return bread;
};

export const getPrev = (file, allTocs, allHeadings) => {
  const currDir = path.dirname(file);
  const currToc = allTocs[`${currDir}/index.cadey`];
  const currTocEntries = Object.entries(currToc || {});
  const currTocI = currTocEntries.findIndex((item) => item[0] === file);
  if (currTocEntries[currTocI - 1]) {
    const entry = currTocEntries[currTocI - 1];
    return JSON.stringify({ url: toUrl(entry[0]), title: entry[1] });
  } else if (!file.endsWith("index.cadey")) {
    const parentIndex = `${currDir}/index.cadey`;
    return allHeadings[parentIndex]
      ? JSON.stringify({
          url: toUrl(parentIndex),
          title: allHeadings[parentIndex][0].title,
        })
      : null;
  } else {
    const parentIndex = `${path.dirname(currDir)}/index.cadey`;
    const parentToc = allTocs[parentIndex];
    if (!parentToc) {
      return null;
    }
    const parentTocEntries = Object.entries(parentToc);
    const entry =
      parentTocEntries[
        parentTocEntries.findIndex(([entry]) => entry === file) - 1
      ];
    if (entry && entry[0] !== file) {
      return JSON.stringify({
        url: toUrl(entry[0]),
        title: entry[1],
      });
    } else {
      return allHeadings[parentIndex]
        ? JSON.stringify({
            url: toUrl(parentIndex),
            title: allHeadings[parentIndex][0].title,
          })
        : null;
    }
  }
};

export const getNext = (file, allTocs) => {
  const currDir = path.dirname(file);
  const currToc = allTocs[`${currDir}/index.cadey`];
  const currTocEntries = Object.entries(currToc || {});
  const currTocI = currTocEntries.findIndex((item) => item[0] === file);
  if (`${currDir}/index.cadey` === file && currTocEntries.length) {
    const entry = currTocEntries[0];
    return JSON.stringify({ url: toUrl(entry[0]), title: entry[1] });
  }
  if (!currTocEntries[currTocI + 1]) {
    let currSubDir = currDir;
    let { parentTocI, parentToc } = getParentTocI(currSubDir, allTocs);
    while (parentToc && !parentToc[parentTocI + 1]) {
      currSubDir = path.dirname(currSubDir);
      const parent = getParentTocI(currSubDir, allTocs);
      parentTocI = parent.parentTocI;
      parentToc = parent.parentToc;
    }
    if (!parentToc) {
      return null;
    }
    const entry = parentToc[parentTocI + 1];
    return JSON.stringify({ url: toUrl(entry[0]), title: entry[1] });
  } else {
    const entry = currTocEntries[currTocI + 1];
    return JSON.stringify({ url: toUrl(entry[0]), title: entry[1] });
  }
};

export const getSubNav = (tocs, meta, [route, title]) => {
  if (!route.endsWith("index.cadey")) {
    return { url: toUrl(route), title, meta: meta[route] || null };
  }
  const toc = tocs[route];
  return {
    url: toUrl(route),
    title,
    entries: toc
      ? Object.entries(toc).map((toc) => getSubNav(tocs, meta, toc))
      : null,
  };
};

export const getNav = (tocs, meta, project) => {
  const mainToc = tocs[`src/routes/${project}/index.cadey`];
  return Object.entries(mainToc).map((entry) => getSubNav(tocs, meta, entry));
};
