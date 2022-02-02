import { getInstanceData } from "../../utils/ec2.js";
import { loginWithConfig } from "./common.js";
import { getSignedAWSLoginConfig } from "../../utils/aws.js";

export default async (vaultRole, awsServerId, mountPoint = "aws") => {
  const { role, credentials } = await getInstanceData();

  const config = getSignedAWSLoginConfig(awsServerId, {
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.Token,
  });

  await loginWithConfig(config, vaultRole || role, mountPoint);
};
