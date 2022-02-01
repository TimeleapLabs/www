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
3. `lib/auth/approle.js/default`: Login function to be used by "Apps".
4. `lib/wrap.js/getWrappedToken`: To get a Cubbyhole wrapped token for an Approle.

Read the function definitions for available options.

## Other exports

1. `index.js/vault`: A Vault instance already intialized, that works with the above methods.
