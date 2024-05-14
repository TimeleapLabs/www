import { NamedParameter } from "@timeleap/tiramisu/dist/types/nodes.js";

const translateMap = {
  /** @type {(node: import("@timeleap/tiramisu/dist/types/nodes").FunctionCall) => string} */
  heading: (node) => {
    const options = node.parameters.parameters
      .filter((node) => node instanceof NamedParameter)
      .map((node) => ({ [node.name]: node.value }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const text = node.parameters.parameters
      .filter((node) => !(node instanceof NamedParameter))
      .map((node) => node.toString(translateMap))
      .join("");

    return `<h${options.level || 1}>${text}</h${options.level || 1}>`;
  },

  /** @type {(node: import("@timeleap/tiramisu/dist/types/nodes").Tiramisu) => string} */
  tiramisu: (node) => {
    return node.children.map((node) => node.toString(translateMap)).join("");
  },

  /** @type {(node: import("@timeleap/tiramisu/dist/types/nodes").Paragraph) => string} */
  paragraph: (node) => {
    return `<p>${node.children
      .map((node) => node.toString(translateMap))
      .join("")}</p>\n\n`;
  },
};

export default translateMap;
