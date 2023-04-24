import { Product } from "src/lib/product";
import { chainOptions, frequencyOptions } from "src/lib/dash/deep-index";
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
  frequency: {
    name: "Tier",
    oneOf: frequencyOptions.map((option) => option.value),
    methods: ["insert", "credit"],
  },
  duration: form.types.positiveNumber("Duration", ["insert", "credit"]),
  fromBlock: form.types.positiveNumber("Block", ["insert"]),
  storage: form.types.positiveNumber("Storage", ["insert", "credit"]),
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

const prices = {
  insert(values) {
    return getSyncPrice(values.frequency, values.storage, values.duration);
  },
  credit(values) {
    return getSyncPrice(values.frequency, values.storage, values.duration);
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
        fromBlock
        chain
        address
        expiresAt
        storage
        frequency
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
