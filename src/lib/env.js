import ecsLogin from "@kenshi.io/vault/lib/auth/fargate.js";
import { vault } from "@kenshi.io/vault";

let secrets;

export const get = async (key) => {
  if (!secrets) {
    await ecsLogin(undefined, "vault.kenshi.io");
    const response = await vault.read("kv/data/kenshi/secrets/ecs/www/env");
    secrets = response.data.data;
  }

  return secrets[key];
};
