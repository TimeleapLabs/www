import { JSDOM } from "jsdom";

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
  "Kenshi is a Swiss based blockchain company offering blockchain services such as deep indexing, VRF, product development, security audits, and more.";

export const getSeoTags = (body, context) => {
  const description = getDescription(body) || defaultDescription;

  const { images, headings } = context;

  const image = images?.length
    ? images[0]
    : "https://kenshi.io/images/social.png";

  const title =
    headings?.length && headings[0].title != "Documentation"
      ? `Kenshi — ${headings[0].title} — Documentation`
      : "Kenshi — Documentation";

  return `
    <title>${title}</title>

    <meta name="title" content="${title}" />
    <meta name="description" content="${description}"/>

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}"/>
    <meta property="og:image" content="${image}" />
    
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}"/>
    <meta property="twitter:image" content="${image}"/>
  `;
};
