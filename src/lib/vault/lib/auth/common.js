import { vault } from "../../exports/vault.js";

export const loginWithConfig = async (config) => {
  const response = await vault.awsIamLogin({
    role: config.role,
    mountPoint: "aws",
    iam_request_url: config.iam_request_url,
    iam_request_body: config.iam_request_body,
    iam_request_headers: config.iam_request_headers,
    iam_http_request_method: config.iam_http_request_method,
  });

  vault.token = response.auth.client_token;
};
