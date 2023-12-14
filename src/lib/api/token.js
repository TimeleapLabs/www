import { ethers } from "ethers";
import { getKenshiUSDPrice } from "$lib/uniswap";

const initialSupply = ethers.BigNumber.from("1000000000000000000000000000");
const reservedSupply = ethers.BigNumber.from("140000000000000000000000000");

export const fetchSupply = async () => {
  const circulatingSupply = initialSupply.sub(reservedSupply);

  return {
    circulating: ethers.utils.formatUnits(circulatingSupply),
    burned: "0",
  };
};

export const fetchTokenPriceFromPair = async () => {
  return {
    price: await getKenshiUSDPrice(),
  };
};
