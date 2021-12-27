import deployerAbi from "src/lib/abi/deployer";
import bep20Abi from "src/lib/abi/bep20";
import cakeAbi from "src/lib/abi/cake";
import { ethers } from "ethers";

const moralis = process.env.MORALIS;
const JSONRPC = "https://bsc-dataseed.binance.org/";
const deployerAddr = "0xaADa8d6030c590b2F7c8a0c6Eb102AE424E5413b";

const getDisplayName = async (provider, token) => {
  if (token.symbol === "Cake-LP") {
    const cake = new ethers.Contract(token.token_address, cakeAbi, provider);
    const token0Addr = await cake.token0();
    const token1Addr = await cake.token1();
    const token0 = new ethers.Contract(token0Addr, bep20Abi, provider);
    const token1 = new ethers.Contract(token1Addr, bep20Abi, provider);
    const name0 = await token0.name();
    const name1 = await token1.name();
    return `${name0} / ${name1} LP`;
  }
  return token.name;
};

const setTokenMetadata = (provider) => async (token) => {
  const bep20 = new ethers.Contract(token.token_address, bep20Abi, provider);
  const bigInt = await bep20.totalSupply();
  const total_supply = await bigInt.toString();
  const display_name = await getDisplayName(provider, token);
  return {
    ...token,
    total_supply,
    display_name,
  };
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  const { address } = request.params;
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC);
  const deployer = new ethers.Contract(deployerAddr, deployerAbi, provider);
  const isKenshiLocker = await deployer.isKenshiLocker(address);

  if (!isKenshiLocker) {
    return {
      status: 404,
    };
  }

  const req = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=0x38`,
    { headers: { "X-API-Key": moralis } }
  );

  if (req.status !== 200) {
    return {
      status: req.status,
    };
  }

  const tokens = await req.json();

  return {
    status: req.status,
    body: await Promise.all(tokens.map(setTokenMetadata(provider))),
  };
}
