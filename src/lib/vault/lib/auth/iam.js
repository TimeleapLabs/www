import { AWS_ROLE } from "../../meta/parameters.js";
import { getSignedAWSLoginConfig } from "../../utils/aws.js";
import { loginWithConfig } from "./common.js";

export default async (
  vaultRole = AWS_ROLE,
  awsServerId,
  mountPoint = "aws"
) => {
  const config = getSignedAWSLoginConfig(awsServerId);
  await loginWithConfig(config, vaultRole, mountPoint);
};
