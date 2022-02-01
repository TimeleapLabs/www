import { config } from "../meta/config.js";
import { DEFAULT_WRAP_TTL } from "../meta/constants.js";

export const wrapped = async (fn, ttl = DEFAULT_WRAP_TTL) => {
  const { requestOptions } = config;
  config.requestOptions = {
    headers: {
      "X-Vault-Wrap-TTL": ttl,
    },
  };
  try {
    const result = await fn();
    config.requestOptions = requestOptions;
    return result;
  } catch (error) {
    config.requestOptions = requestOptions;
    throw error;
  }
};
