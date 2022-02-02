import { STS_BODY, STS_URL } from "../meta/constants.js";
import { sign } from "./sign.js";
import { headersToGoStyle } from "./go.js";
import { base64 } from "./base64.js";

export const getSignedAWSLoginConfig = (role, id, options) => {
  const signedRequest = sign(id, options);
  const headers = headersToGoStyle(signedRequest.headers);

  return {
    role,
    iam_http_request_method: "POST",
    iam_request_url: base64(STS_URL),
    iam_request_body: base64(STS_BODY),
    iam_request_headers: base64(JSON.stringify(headers)),
  };
};
