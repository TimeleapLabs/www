import { Product } from "src/lib/product";
import { form } from "src/lib/form";
import { getReverseAPIPrice } from "src/lib/dash/pricing";
import { allowFromValues } from "src/lib/utils";

const schema = {
  endpoint: {
    name: "Endpoint",
    regex: /https?:\/\/.+/,
    methods: ["insert", "update"],
  },
  duration: {
    name: "Duration",
    methods: ["insert", "credit"],
    validate(value, method) {
      const n = Number(value);
      if (!isFinite(n)) {
        return `Duration should be a number`;
      }
      if (method === "credit" && n === 0) return;
      if (n <= 0) {
        return `isFinite needs to be bigger than 0`;
      }
    },
  },
  requests: form.types.positiveNumber("Requests", ["insert", "credit"]),
  query: {
    name: "Query",
    optional: true,
    methods: ["insert", "update"],
  },
  chain: {
    name: "Blockchain",
    regex: /.+/,
    methods: ["insert"],
  },
  fromBlock: form.types.positiveNumber("From block", ["insert"]),
  syncTaskId: {
    name: "Sync task",
    regex: /.+/,
    methods: ["insert"],
  },
};

const endpoint = "https://api.kenshi.io/subscriptions/webhook";
const payloadKey = "webhook";
const name = "R-API";

const prices = {
  insert(values) {
    return getReverseAPIPrice(values.duration, values.requests);
  },
  credit(values, _current) {
    return getReverseAPIPrice(values.duration, values.requests);
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

    const query = allowFromValues({
      contracts,
      events,
      minBlock,
      maxBlock,
      args,
    });

    return { ...rest, query };
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

    const query = allowFromValues({
      contracts,
      events,
      minBlock,
      maxBlock,
      args,
    });

    return { ...rest, query, id: current.id };
  },
  credit(values, current) {
    return { ...values, id: current.id };
  },
};

const query = (owner) => `{
    getUserSubs(owner: "${owner}", webhooks: true) {
      webhooks {
        id
        syncTaskId
        fromBlock
        step
        chain
        endpoint
        interval
        timeout
        requests
        query {
          condition
          value
          comparison
          arg
        }
        expiresAt
      }
    }
  }`;

const graphqlKey = "webhooks";

export const WebhookProduct = new Product({
  schema,
  endpoint,
  payloadKey,
  name,
  prices,
  valuesFromForm,
  query,
  graphqlKey,
});
