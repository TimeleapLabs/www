import aws4 from "aws4";
import { STS_BODY } from "../meta/constants.js";

export const signWithServerId = (awsServerId, options = {}) =>
  aws4.sign({
    service: "sts",
    headers: { "X-Vault-AWS-IAM-Server-ID": awsServerId },
    body: STS_BODY,
    ...options,
  });

export const signNoServerId = (options = {}) =>
  aws4.sign({ service: "sts", body: STS_BODY, ...options });

export const sign = (awsServerId, options) =>
  awsServerId
    ? signWithServerId(awsServerId, options)
    : signNoServerId(options);
