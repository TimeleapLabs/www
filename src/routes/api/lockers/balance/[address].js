import bep20Abi from "$lib/abi/bep20";
import cakeAbi from "$lib/abi/cake";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { getDB } from "$lib/mongo";
import { sync } from "$lib/blockchain/sync/balances";

dotenv.config();

const JSONRPC = "https://bsc-dataseed.binance.org/";

const getDisplayName = async (provider, symbol, token) => {
  if (symbol === "Cake-LP") {
    const cake = new ethers.Contract(token.address, cakeAbi, provider);
    const token0Addr = await cake.token0();
    const token1Addr = await cake.token1();
    const token0 = new ethers.Contract(token0Addr, bep20Abi, provider);
    const token1 = new ethers.Contract(token1Addr, bep20Abi, provider);
    const name0 = await token0.name();
    const name1 = await token1.name();
    return `${name0} / ${name1} LP`;
  }
  return await token.name();
};

const getTokenInfo = async (provider, contract) => {
  const db = await getDB();
  const collection = db.collection("tokenInfo");

  const cache = await collection.findOne({ token: contract.address });

  if (cache) {
    const { token, symbol, name, decimals, supply } = cache;
    return { token, symbol, name, decimals, supply };
  }

  const symbol = await contract.symbol();
  const name = await getDisplayName(provider, symbol, contract);
  const decimals = await contract.decimals();
  const supply = await contract.totalSupply();

  const toCache = {
    token: contract.address,
    symbol,
    name,
    decimals,
    supply: supply.toString(),
  };

  await collection.updateOne(toCache, { $set: toCache }, { upsert: true });

  return toCache;
};

const setTokenMetadata =
  (provider) =>
  async ({ token, address }) => {
    const bep20 = new ethers.Contract(token, bep20Abi, provider);
    const balance = await bep20.balanceOf(address);
    const tokenInfo = await getTokenInfo(provider, bep20);
    return {
      ...tokenInfo,
      balance: balance.toString(),
    };
  };

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  const { address } = request.params;
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC);

  await sync(address).catch(() => {});

  const db = await getDB();
  const collection = db.collection("walletTokens");

  const tokens = await collection.find({ address }).toArray();

  return {
    status: 200,
    body: await Promise.all(tokens.map(setTokenMetadata(provider))),
  };
}
