import { vault } from "../exports/vault.js";
import { wrapped } from "../utils/wrapped.js";
import { DEFAULT_WRAP_TTL } from "../meta/constants.js";

export const getWrappedToken = async (roleName, ttl = DEFAULT_WRAP_TTL) => {
  const response = await wrapped(
    () =>
      vault.getApproleRoleSecret({
        role_name: roleName,
      }),
    ttl
  );

  return response.wrap_info.token;
};
