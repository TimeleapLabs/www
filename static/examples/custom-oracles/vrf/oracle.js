import { decode, prove, getFastVerifyComponents } from "@kenshi.io/node-ecvrf";
import { createHash } from "crypto";
import elliptic from "elliptic";

const EC = new elliptic.ec("secp256k1");

export const getPublicKey = (privateKey) => {
  const key = EC.keyFromPrivate(privateKey);
  return {
    key: key.getPublic("hex"),
    compressed: key.getPublic(true, "hex"),
    x: key.getPublic().getX(),
    y: key.getPublic().getY(),
  };
};

const fromHex = (hex) => Buffer.from(hex.slice(2));

const hash = (...args) => {
  const sha256 = createHash("sha256");
  for (const arg of args) sha256.update(arg);
  return sha256.digest().toString("hex");
};

export const handler = async ({ body }) => {
  const { entry } = JSON.parse(body);

  // You can generate a private key using the `keygen` function
  // exported by the @kenshi.io/node-ecvrf library
  const publicKey = getPublicKey(process.env.VRF_PRIVATE_KEY);

  const alpha = hash(
    fromHex(entry.transaction.hash),
    fromHex(entry.log.index),
    fromHex(entry.block.address),
    fromHex(entry.event.args.requestId)
  );

  const proof = prove(process.env.VRF_PRIVATE_KEY, alpha);
  const fast = getFastVerifyComponents(publicKey.key, proof, alpha);
  const [Gamma, c, s] = decode(proof);

  return {
    statusCode: 200,
    body: JSON.stringify({
      method: "setRandomness",
      args: [
        [Gamma.x.toString(), Gamma.y.toString(), c.toString(), s.toString()],
        `0x${alpha}`,
        [fast.uX, fast.uY],
        [fast.sHX, fast.sHY, fast.cGX, fast.cGY],
        entry.event.args.requestId,
      ],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
