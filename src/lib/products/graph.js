import { Product } from "src/lib/product";
import { form } from "src/lib/form";
import { getGraphQLPrice } from "src/lib/dash/pricing";
import { allowFromValues } from "src/lib/utils";

const schema = {
  key: {
    name: "Key",
    regex: /.+/,
    methods: ["insert", "update"],
    validate(value, method) {
      if (method === "update") return;
      if (!value) return "API key is required";
    },
  },
  requests: form.types.positiveNumber("Requests", ["insert", "credit"]),
  allow: {
    name: "Allow",
    methods: ["insert", "update"],
    optional: true,
  },
  arguments: {
    name: "Arguments",
    methods: ["insert", "update"],
  },
  sharedKey: {
    name: "Shared key",
    regex: /.+/,
    methods: ["insert", "update"],
    validate(value, method) {
      if (method === "update") return;
      if (!value) return "Shared key is required";
    },
  },
  encryptedKey: {
    name: "Encrypted key",
    regex: /.+/,
    methods: ["insert", "update"],
    validate(value, method) {
      if (method === "update") return;
      if (!value) return "Encrypted key is required";
    },
  },
};

const endpoint = "https://api.kenshi.io/subscriptions/graphql";
const payloadKey = "graphql";
const name = "API key";

const prices = {
  insert(values) {
    return getGraphQLPrice(values.requests);
  },
  credit(values, _current) {
    return getGraphQLPrice(values.requests);
  },
};

const valuesFromForm = {
  insert(values) {
    const {
      contracts,
      events,
      minBlock,
      maxBlock,
      arguments: args,
      ...rest
    } = values;

    const allow = allowFromValues({
      contracts,
      events,
      minBlock,
      maxBlock,
      args,
    });

    return { ...rest, allow };
  },
  update(values, current) {
    const {
      contracts,
      events,
      minBlock,
      maxBlock,
      arguments: args,
      ...rest
    } = values;

    const allow = allowFromValues({
      contracts,
      events,
      minBlock,
      maxBlock,
      args,
    });

    return { ...rest, allow, id: current.id };
  },
  credit(values, current) {
    return { ...values, id: current.id };
  },
};

const query = (owner) => `{
    getUserSubs(owner: "${owner}", apiKeys: true) {
      apiKeys {
        id
        requests
        sharedKey
        encryptedKey
        createdAt
        allow {
          condition
          value
          comparison
          arg
        }
      }
    }
  }`;

const graphqlKey = "apiKeys";

export const GraphProduct = new Product({
  schema,
  endpoint,
  payloadKey,
  name,
  prices,
  valuesFromForm,
  query,
  graphqlKey,
});
