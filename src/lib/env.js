import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const region = "eu-central-1";
const clientOptions = { region };
const client = new SecretsManagerClient(clientOptions);

const secrets = {};

export const get = async (name = "secrets/www/env") => {
  if (secrets[name]) return secrets[name];

  let secret;
  if (process.env.NODE_ENV === "development") {
    secret = process.env;
  } else {
    const input = { SecretId: name };
    const command = new GetSecretValueCommand(input);
    const response = await client.send(command);
    secret = JSON.parse(response.SecretString);
  }

  secrets[name] = secret;
  return secret;
};
