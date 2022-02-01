import fetch from "node-fetch";
import { EC2_METADATA_URL } from "../meta/constants.js";

const ROLE_URL = `${EC2_METADATA_URL}meta-data/iam/security-credentials/`;

const credentialsUrl = (role) => `${ROLE_URL}${role}`;

const getRole = async () => fetch(ROLE_URL).then((res) => res.text());

const getCredentials = async (role) =>
  fetch(credentialsUrl(role)).then((res) => res.json());

export const getInstanceData = async () => {
  const role = await getRole();
  const credentials = await getCredentials(role);

  return {
    role,
    credentials,
  };
};
