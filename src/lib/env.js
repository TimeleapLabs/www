import ecsLogin from "@kenshi.io/vault/lib/auth/fargate.js";
import { vault } from "@kenshi.io/vault";

let secrets;

export const get = async (key) => {
  if (!secrets) {
    await ecsLogin();
    const response = await vault.read("kv/data/kenshi/secrets/ecs/www/env");
    console.log(response);
    secrets = response.data;
  }

  return secrets[key];
};
