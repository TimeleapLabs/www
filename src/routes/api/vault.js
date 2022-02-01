import ecsLogin from "@kenshi.io/vault/lib/auth/fargate.js";
import { vault } from "@kenshi.io/vault";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  console.log("trying to get the secrets");
  await ecsLogin();
  const secret = await vault.read("kv/data/kenshi/secrets/ecs/www/test");
  console.log("here is the sekret komrad", secret);
  return { status: 200 };
}
