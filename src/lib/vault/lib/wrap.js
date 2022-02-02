import { vault } from "../exports/vault.js";
import { wrapped } from "../utils/wrapped.js";
import { DEFAULT_WRAP_TTL } from "../meta/constants.js";

export const getWrappedApproleSecretId = async (
  roleName,
  ttl = DEFAULT_WRAP_TTL
) => {
  const response = await wrapped(
    () =>
      vault.getApproleRoleSecret({
        role_name: roleName,
      }),
    ttl
  );

  return response.wrap_info.token;
};

export const getWrappedApproleRoleId = async (
  roleName,
  ttl = DEFAULT_WRAP_TTL
) => {
  const response = await wrapped(
    () =>
      vault.getApproleRoleId({
        role_name: roleName,
      }),
    ttl
  );

  return response.wrap_info.token;
};
