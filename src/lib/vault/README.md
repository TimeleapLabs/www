# Kenshi Vault Helpers

This library wraps the `node-vault` Node.js library, adding a few useful functions
to make life easier inside the Kenshi aws flow.

## Environment Variables

The following environment variables are availabe for configuration:

1. `VAULT_ADDR`: Address of the vault
2. `VAULT_IAM_ROLE`: AWS IAM role to use for auth
3. `AWS_ACCESS_KEY_ID`: AWS access key (Available by default on Lambda, not needed on EC2)
4. `AWS_SECRET_ACCESS_KEY`: AWS secret access key (Available by default on Lambda, not needed on EC2)
5. `AWS_SESSION_TOKEN`: AWS session (Available by default on Lambda, not needed on EC2)

## Methods

The following methods are available:

1. `lib/auth/ec2.js/default`: Login function to be used on EC2 instances.
2. `lib/auth/iam.js/default`: Login function to be used on Lambda or other resources with IAM.
3. `lib/auth/approle.js/default`: Login function to be used with approle credentials.
4. `lib/auth/approle.js/wrapped`: Login function to be used with wrapped approle credentials.
5. `lib/auth/approle.js/unwrapped`: Login function to be used with unwrapped approle credentials.
6. `lib/wrap.js/getWrappedApproleSecretId`: Get a Cubbyhole wrapped token for an Approle secret id.
7. `lib/wrap.js/getWrappedApproleRoleId`: Get a Cubbyhole wrapped token for an Approle role id.

Read the function definitions for available options.

## Other exports

1. `index.js/vault`: A Vault instance already intialized, that works with the above methods.
