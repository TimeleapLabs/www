import { JSDOM } from "jsdom";

export const getTextContent = (body) => {
  const { document } = new JSDOM(`<body>${body}</body>`).window;
  document.body
    .querySelectorAll("h1,h2,h3,h4,h5,CodeSnippet")
    .forEach((el) => el.remove());
  return document.body.textContent
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
};

const getDescription = (body) => {
  const { document } = new JSDOM(`<body>${body}</body>`).window;
  const secondDiv = document.querySelector("body > Row:nth-of-type(2)");
  const pretty = secondDiv.textContent
    .replace(/\n/g, " ")
    .replace(/ +/g, " ")
    .replace(/:/g, ".")
    .replace(/"/g, "")
    .trim();
  const short =
    pretty.length > 155
      ? pretty.slice(0, 155).replace(/ [^ ]*$/, "...")
      : pretty;
  return short;
};

const defaultDescription =
  "Timeleap is a start-up in Switzerland that provides blockchain technology services, including data indexing, oracles, IoT SDK, and product development.";

const absolute = (url) =>
  url.startsWith("/") ? `https://old.timeleap.swiss${url}` : url;

const titlesByType = {
  blog: "Blog",
  docs: "Documentation",
};

export const getSeoTags = (body, context, type) => {
  const description = getDescription(body) || defaultDescription;

  const { images, headings } = context;

  const image = images?.length
    ? images[0]
    : "https://old.timeleap.swiss/images/social.png";

  const title =
    headings?.length && headings[0].title != titlesByType[type]
      ? `Timeleap — ${headings[0].title} — ${titlesByType[type]}`
      : `Timeleap — ${titlesByType[type]}`;

  return `
    <title>${title}</title>

    <meta name="title" content="${title}" />
    <meta name="description" content="${description}"/>

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}"/>
    <meta property="og:image" content="${absolute(image)}" />
    
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}"/>
    <meta property="twitter:image" content="${absolute(image)}"/>
  `;
};
