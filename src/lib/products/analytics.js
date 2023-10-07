import { Product } from "src/lib/product";
import { chainOptions } from "src/lib/dash/deep-index";
import { form } from "src/lib/form";
import { getAnalyticsPrice } from "src/lib/dash/pricing";

const schema = {
  chain: {
    name: "Chain",
    oneOf: chainOptions.map((option) => option.value),
    methods: ["insert"],
  },
  address: {
    name: "Contract address",
    regex: /^0x[0-9a-f]{40}$/i,
    methods: ["insert", "update"],
  },
  twitter: {
    name: "Twitter",
    regex: /^.*/,
    methods: ["insert", "update"],
    optional: true,
  },
  telegram: {
    name: "Telegram",
    regex: /^.*/,
    methods: ["insert", "update"],
    optional: true,
  },
  discord: {
    name: "Discord",
    regex: /^.*/,
    methods: ["insert", "update"],
    optional: true,
  },
  buylink: {
    name: "Buylink",
    regex: /^.*/,
    methods: ["insert", "update"],
    optional: true,
  },
  website: {
    name: "Website",
    regex: /^.*/,
    methods: ["insert", "update"],
    optional: true,
  },
  logo: {
    name: "Logo",
    regex: /^.+/,
    methods: ["insert", "update"],
  },
  description: {
    name: "Description",
    regex: /^.{1,512}/,
    methods: ["insert", "update"],
  },
  summary: {
    name: "Summary",
    regex: /^.{1,128}/,
    methods: ["insert", "update"],
  },
  name: {
    name: "Name",
    regex: /^.+/,
    methods: ["insert", "update"],
  },
  symbol: {
    name: "Symbol",
    regex: /^.+/,
    methods: ["insert", "update"],
  },
  duration: form.types.positiveNumber("Duration", ["insert", "credit"]),
  fromBlock: form.types.positiveNumber("Block", ["insert"]),
};

const endpoint = "https://api.kenshi.io/subscriptions/analytics";
const payloadKey = "analytics";
const name = "Analytics profile";

const prices = {
  insert(values) {
    return getAnalyticsPrice(values.duration);
  },
  credit(values) {
    return getAnalyticsPrice(values.duration);
  },
};

const valuesFromForm = {
  insert(values) {
    return values;
  },
  update(values, current) {
    return { ...values, id: current.id };
  },
  credit(values, current) {
    return { ...values, id: current.id };
  },
};

const query = (owner) => `{
    getUserSubs(owner: "${owner}", analytics: true) {
      analytics {
        id
        fromBlock
        chain
        address
        metadata {
          twitter
          telegram
          discord
          buylink
          website
          description
          summary
          name
          symbol
          logo
        }
        expiresAt
      }
    }
  }`;

const graphqlKey = "analytics";

export const AnalyticsProduct = new Product({
  schema,
  endpoint,
  payloadKey,
  name,
  prices,
  valuesFromForm,
  query,
  graphqlKey,
});
