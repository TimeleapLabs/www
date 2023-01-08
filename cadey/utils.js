import slugify from "slugify";
import { extensions } from "./languages.js";

export const toUrl = (file) =>
  file
    .replace("src/routes", "")
    .replace("/index.cadey", "")
    .replace(".cadey", "");

export const slug = (str) => slugify(str, { lower: true, strict: true });

export const asText = (arr) => {
  if (typeof arr == "string") return arr;
  return arr.map(asText).join("").trim();
};

export const asArgList = (arr) => {
  return arr
    .map(asText)
    .map((str) => str.trim())
    .filter(Boolean);
};

export const unIndent = (text) => {
  text = text.replace(/[ \n]+$/, "");
  let lines = text.split("\n");
  let sliceIndex = 0;
  for (const index in lines) {
    const line = lines[index];
    if (!line || line.match(/^ +$/)) sliceIndex++;
    else break;
  }
  lines = lines.slice(sliceIndex);
  const indent = Math.min(
    ...lines.map((line) => {
      const match = line.match(/^ +/);
      if (!match) return 0;
      return match[0].length;
    })
  );
  return lines.map((line) => line.slice(indent)).join("\n");
};

export const getLang = (src) => extensions[src.split(".").pop()]?.toLowerCase();

export const arrayOrNotWhite = (item) =>
  Array.isArray(item) || item.match(/\S+/);

export const isWhite = (str) => str.match(/^\s+$/);
export const removeWhites = (cell) => typeof cell != "string" || !isWhite(cell);
