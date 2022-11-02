import { Product } from "src/lib/product";
import { chainOptions, tiers } from "src/lib/dash/deep-index";
import { form } from "src/lib/form";
import { abiValidator } from "src/lib/dash/validators";
import { getSyncPrice } from "src/lib/dash/pricing";

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
  tier: {
    name: "Tier",
    oneOf: Object.keys(tiers),
    methods: ["insert"],
  },
  duration: form.types.positiveNumber("Duration", ["insert", "credit"]),
  fromBlock: form.types.positiveNumber("Block", ["insert"]),
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

const endpoint = "https://api.kenshi.io/subscriptions/sync";
const payloadKey = "task";
const name = "Sync task";

const tierMap = {
  15: "startup",
  10: "growth",
  5: "business",
  1: "enterprise",
};

const prices = {
  insert(values) {
    return getSyncPrice(values.tier, values.duration);
  },
  credit(values, current) {
    return getSyncPrice(tierMap[current.interval], values.duration);
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
    getUserSubs(owner: "${owner}", syncTasks: true) {
      syncTasks {
        id
        signature
        abi
        args {
          name
          value
        }
        fromBlock
        step
        chain
        address
        interval
        timeout
        expiresAt
      }
    }
  }`;

const graphqlKey = "syncTasks";

export const SyncProduct = new Product({
  schema,
  endpoint,
  payloadKey,
  name,
  prices,
  valuesFromForm,
  query,
  graphqlKey,
});
