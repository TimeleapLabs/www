import slugify from "slugify";
import { extensions } from "./languages.js";

export const toUrl = (file) =>
  file
    .replace("src/routes", "")
    .replace("/index.tiramisu", "")
    .replace(".tiramisu", "");

export const slug = (str) => slugify(str, { lower: true, strict: true });

export const asText = (arr) => {
  if (typeof arr == "string") return arr;
  return arr.map(asText).join("").trim();
};

export const asCode = (arr) => {
  if (typeof arr == "string") return arr;
  return arr.map(asCode).join("");
};

export const asArgList = (arr) => {
  return arr
    .map(asText)
    .map((str) => str.trim())
    .filter(Boolean);
};

export const unIndent = (text) => {
  const trim = text.replace(/^\s*\n/, "");
  const indent = trim.match(/^ +/)?.[0].length || 0;
  return trim
    .split("\n")
    .map((line) => line.slice(indent))
    .join("\n");
};

export const getLang = (src) => extensions[src.split(".").pop()]?.toLowerCase();

export const arrayOrNotWhite = (item) =>
  Array.isArray(item) || item.match(/\S+/);

export const isWhite = (str) => str.match(/^\s+$/);
export const removeWhites = (cell) => typeof cell != "string" || !isWhite(cell);
