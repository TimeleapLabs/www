import { vault } from "../../exports/vault.js";

const defaultOptions = {
  roleIdIsWrapped: false,
  secretIdIsWrapped: false,
};

const getSecretId = async (tokenOrId, isWrapped) => {
  if (isWrapped) {
    const unwrapped = await vault.unwrap({ token: tokenOrId });
    return unwrapped.data.secret_id;
  }
  return tokenOrId;
};

const getRoleId = async (tokenOrId, isWrapped) => {
  if (isWrapped) {
    const unwrapped = await vault.unwrap({ token: tokenOrId });
    return unwrapped.data.role_id;
  }
  return tokenOrId;
};

const login = async (roleId, secretId, options = defaultOptions) => {
  const uSecretId = await getSecretId(secretId, options.secretIdIsWrapped);
  const uRoleId = await getRoleId(roleId, options.roleIdIsWrapped);

  const response = await vault.approleLogin({
    role_id: uRoleId,
    secret_id: uSecretId,
  });

  vault.token = response.auth.client_token;
};

export default login;

export const wrapped = (roleId, secretId) =>
  login(roleId, secretId, { roleIdIsWrapped: true, secretIdIsWrapped: true });

export const unwrapped = (roleId, secretId) =>
  login(roleId, secretId, { roleIdIsWrapped: false, secretIdIsWrapped: false });
