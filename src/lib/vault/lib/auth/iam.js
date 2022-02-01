import { AWS_ROLE } from "../../meta/parameters.js";
import { getSignedAWSLoginConfig } from "../../utils/aws.js";
import { loginWithConfig } from "./common.js";

export default async (role = AWS_ROLE, awsServerId) => {
  const config = getSignedAWSLoginConfig(role, awsServerId);
  await loginWithConfig(config);
};
