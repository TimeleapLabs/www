import { toast } from "@zerodevx/svelte-toast";
import { ethers } from "ethers";

export const check = (document, fieldNames, invalids) => {
  if (!Object.keys(document).length) {
    toast.push("Please fill in the form first!");
    return false;
  }

  for (const [key, value] of Object.entries(document)) {
    if (!value) {
      toast.push(`${fieldNames[key]} is required.`);
      return false;
    }
  }

  for (const [key, valid] of Object.entries(invalids)) {
    if (!valid) {
      toast.push(`${fieldNames[key]} is invalid.`);
      return false;
    }
  }

  return true;
};

export const abiValidator = (value) => {
  try {
    const abi = JSON.parse(value);
    return Array.isArray(abi) && new ethers.utils.Interface(abi);
  } catch (error) {
    return false;
  }
};
