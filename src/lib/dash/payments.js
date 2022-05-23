import { fetchPancake } from "../api/token";
import { ethers } from "ethers";
import { onboard } from "../onboard";
import { toast } from "@zerodevx/svelte-toast";
import kenshiAbi from "../abi/kenshi";

const collectorAddress = "0xA2dEc4f8089f89F426e6beB76B555f3Cf9E7f499";
const kenshiAddress = "0x61E2738f370371183A8f32F0CC49d54522198276";

const usdToKenshi = async (usd) => {
  const { price } = await fetchPancake();
  return price
    ? ethers.utils.parseUnits(Math.ceil(usd / parseFloat(price)).toFixed())
    : NaN;
};

export const makePayment = async (usd, $wallet, userAddress) => {
  const priceInKenshi = await usdToKenshi(usd);

  if (isNaN(priceInKenshi) || priceInKenshi.eq(0)) {
    toast.push("There was an issue calculating the price.");
    return null;
  }

  try {
    // await onboard.setChain({ chainId: "0x38" });
    await onboard.setChain({ chainId: "0x61" });
  } catch (error) {
    toast.push("Couldn't change to BSC network.");
    return null;
  }

  const provider = new ethers.providers.Web3Provider($wallet.provider);
  const signer = provider.getSigner();
  const kenshi = new ethers.Contract(kenshiAddress, kenshiAbi, signer);
  const balance = await kenshi.balanceOf(userAddress);

  if (priceInKenshi.gt(balance)) {
    toast.push("Balance is lower than the calculated price!");
    return null;
  }

  try {
    const tx = await kenshi.transfer(collectorAddress, priceInKenshi);
    await tx.wait(1);
    return tx.hash;
  } catch (error) {
    toast.push("Payment failed");
    return null;
  }
};
