import { Product } from "src/lib/product";
import { form } from "src/lib/form";
import { getReverseAPIPrice } from "src/lib/dash/pricing";
import { abiValidator } from "src/lib/dash/validators";

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
  chain: {
    name: "Blockchain",
    regex: /.+/,
    methods: ["insert"],
  },
  bearer: {
    name: "Authorization token",
    regex: /.+/,
    methods: ["insert", "update"],
    optional: true,
  },
  fromBlock: form.types.positiveNumber("From block", ["insert"]),
  confirmations: form.types.positiveNumber("Confirmations", [
    "insert",
    "update",
  ]),
  address: {
    name: "Contract address",
    regex: /^0x[0-9a-f]{40}$/i,
    methods: ["insert", "update"],
  },
  abi: {
    name: "ABI",
    validate(value) {
      if (!abiValidator(value)) {
        return "ABI is invalid";
      }
    },
    methods: ["insert", "update"],
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
    return { ...values, abi: JSON.parse(values.abi) };
  },
  update(values, current) {
    return { ...values, abi: JSON.parse(values.abi), id: current.id };
  },
  credit(values, current) {
    return { ...values, id: current.id };
  },
};

const query = (owner) => `{
    getUserSubs(owner: "${owner}", webhooks: true) {
      webhooks {
        id
        fromBlock
        chain
        endpoint
        requests
        abi
        bearer
        address
        confirmations
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
