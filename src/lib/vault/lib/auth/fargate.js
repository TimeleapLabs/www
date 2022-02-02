import { getInstanceData } from "../../utils/fargate.js";
import { loginWithConfig } from "./common.js";
import { getSignedAWSLoginConfig } from "../../utils/aws.js";

export default async (awsServerId) => {
  console.log("trying fargate login");
  const { role, credentials } = await getInstanceData();
  console.log("instance data (credentials omited)", role);

  const config = getSignedAWSLoginConfig(role, awsServerId, {
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.Token,
  });
  console.log("got aws login config", config);

  await loginWithConfig(config);
};
