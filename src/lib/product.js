import { form } from "./form.js";
import { wallet as walletStore } from "src/stores/wallet.js";
import { get } from "svelte/store";
import { toast } from "@zerodevx/svelte-toast";
import { makePayment } from "./dash/payments.js";
import { makeKenshiPayment } from "./dash/payments.js";
import { ethers } from "ethers";
import { getRef } from "./ref.js";

export class Product {
  constructor(options) {
    this.schema = options.schema;
    this.endpoint = options.endpoint;
    this.payloadKey = options.payloadKey;
    this.name = options.name;
    this.prices = options.prices;
    this.valuesFromForm = options.valuesFromForm;
    this.graphQuery = options.graphQuery;
    this.graphqlKey = options.graphqlKey;
    this.query = options.query;
    this.paymentInKenshi = options.paymentInKenshi;
  }

  async findAll(...args) {
    const query = this.query(...args);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    return result.data?.getUserSubs?.[this.graphqlKey] || [];
  }

  async insert({ values, check }) {
    if (!check()) return false;

    const price = this.prices.insert(values);
    const { wallet, userAddress } = this.getCommons();
    const txHash = this.paymentInKenshi
      ? await makeKenshiPayment(price, wallet, userAddress)
      : await makePayment(price, wallet, userAddress);
    if (!txHash) return false;

    const payload = await this.getPayload(values, txHash, "insert");
    return await this.makeRequest(payload, "created", "insert");
  }

  async update({ values, check }, current) {
    if (!check()) return false;
    const payload = await this.getPayload(values, null, "update", current);
    return await this.makeRequest(payload, "updated", "update");
  }

  async credit({ values, check }, current) {
    if (!check()) return false;

    const price = this.prices.credit(values, current);
    const { wallet, userAddress } = this.getCommons();
    const txHash = this.paymentInKenshi
      ? await makeKenshiPayment(price, wallet, userAddress)
      : await makePayment(price, wallet, userAddress);
    if (!txHash) return false;

    const payload = await this.getPayload(values, txHash, "credit", current);
    return await this.makeRequest(payload, "updated", "recharge");
  }

  async getPayload(values, txHash, method, current) {
    const { signer, timestamp } = this.getCommons();

    const valuesFromForm = this.valuesFromForm[method](values, current);
    const message = JSON.stringify([valuesFromForm, txHash, timestamp]);

    const signature = await signer.signMessage(message);
    return {
      [this.payloadKey]: valuesFromForm,
      txHash,
      signature,
      timestamp,
      refCode: getRef(),
    };
  }

  getCommons() {
    const wallet = get(walletStore);
    const userAddress = wallet.accounts?.[0]?.address;

    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();

    return { provider, signer, timestamp, wallet, userAddress };
  }

  async makeRequest(payload, successAction, method) {
    const response = await fetch(`${this.endpoint}/${method}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const { errorMessage, statusCode, body } = await response.json();

    if (errorMessage) {
      toast.push("An unexpected error happened while processing your request");
      return false;
    } else if (statusCode !== 200) {
      toast.push(`Server error: ${body}`);
      return false;
    } else {
      toast.push(`${this.name} ${successAction} successfully`);
      return true;
    }
  }

  getForm(method) {
    return form(this.getSchemaFor(method), method);
  }

  getSchemaFor(method) {
    return Object.fromEntries(
      Object.entries(this.schema).filter(([_, value]) =>
        value.methods.includes(method)
      )
    );
  }
}
