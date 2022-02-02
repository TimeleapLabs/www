import fetch from "node-fetch";
import { FARGATE_METADATA_URL } from "../meta/constants.js";

const getCredentials = async () =>
  fetch(FARGATE_METADATA_URL).then((res) => res.json());

export const getInstanceData = async () => {
  const credentials = await getCredentials();

  return {
    role: credentials.RoleArn.split(":").pop().split("/").pop(),
    credentials,
  };
};
