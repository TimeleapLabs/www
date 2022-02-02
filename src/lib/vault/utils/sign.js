import aws4 from "aws4";
import { STS_BODY } from "../meta/constants.js";

export const sign = (awsServerId, credentials) => {
  const request = {
    service: "sts",
    body: STS_BODY,
    headers: {},
  };
  if (awsServerId) {
    request.headers["X-Vault-AWS-IAM-Server-ID"] = awsServerId;
  }
  return aws4.sign(request, credentials);
};
