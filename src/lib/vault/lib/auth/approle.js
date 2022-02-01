import { vault } from "../../exports/vault.js";

export default async (roleId, wrappedToken) => {
  const unwrapped = await vault.unwrap({ token: wrappedToken });
  const result = await vault.approleLogin({
    role_id: roleId,
    secret_id: unwrapped.data.secret_id,
  });
  vault.token = result.auth.client_token;
};
