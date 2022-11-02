import { Product } from "src/lib/product";
import { form } from "src/lib/form";
import { ethers } from "ethers";
import { getList } from "src/lib/utils";

const schema = {
  allow: {
    name: "Allow",
    methods: ["insert", "update"],
  },
  chain: {
    name: "Blockchain",
    regex: /.+/,
    methods: ["insert"],
  },
  credit: form.types.positiveNumber("Credits", ["insert", "credit"]),
};

const endpoint = "https://api.kenshi.io/subscriptions/vrf";
const payloadKey = "vrf";
const name = "VRF subscription";

const prices = {
  insert(values) {
    return ethers.utils.parseUnits(values.credit.toString());
  },
  credit(values, _current) {
    return ethers.utils.parseUnits(values.credit.toString());
  },
};

const paymentInKenshi = true;

const valuesFromForm = {
  insert(values) {
    return { ...values, allow: getList(values.allow) };
  },
  update(values, current) {
    return { ...values, allow: getList(values.allow), id: current.id };
  },
  credit(values, current) {
    return { ...values, id: current.id };
  },
};

const query = (owner) => `{
    getUserSubs(owner: "${owner}", vrfCredits: true) {
      vrfCredits {
        id
        credit
        allow
        chain
      }
    }
  }`;

const graphqlKey = "vrfCredits";

export const VrfProduct = new Product({
  schema,
  endpoint,
  payloadKey,
  name,
  prices,
  valuesFromForm,
  query,
  graphqlKey,
  paymentInKenshi,
});
