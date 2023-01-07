export const oracle = `import { decode, prove, getFastVerifyComponents } from "@kenshi.io/node-ecvrf";
import { createHash } from "crypto";
import Elliptic from "elliptic";

const EC = new Elliptic.ec("secp256k1");

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
  for (const arg of args) {
    sha256.update(arg);
  }
  return sha256.digest().toString("hex");
};

export const handler = async ({ body }) => {
  const { entry } = JSON.parse(body);

  // You can generate a private key using the \`keygen\` function
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
        \`0x$\{alpha}\`,
        [fast.uX, fast.uY],
        [fast.sHX, fast.sHY, fast.cGX, fast.cGY],
        entry.event.args.requestId,
      ],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
`;

export const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@kenshi.io/vrf-consumer/contracts/VRFUtils.sol";

contract VRFOracle {
    uint256 _requestId;
    mapping(uint256 => bool) alreadyFulfilled;

    event RandomnessRequest(uint256 requestId);
    event RandomnessRequestFulfilled(uint256 requestId, uint256 randomness);

    VRFUtils utils;

    constructor(bytes memory publicKey) {
        utils = new VRFUtils();
        utils.setPublicKey(publicKey);
    }

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestRandomness() external {
        emit RandomnessRequest(_requestId++);
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     *
     * Note: We encourage reading IETF ECVRF drafts to understand
     * what's going on: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-vrf
     */
    function setRandomness(
        uint256[4] memory proof,
        bytes memory message,
        uint256[2] memory uPoint,
        uint256[4] memory vComponents,
        uint256 requestId
    ) external {
        require(!alreadyFulfilled[requestId], "Already fulfilled");
        bool isValid = utils.fastVerify(proof, message, uPoint, vComponents);
        require(isValid, "Cannot verify VRF results");
        bytes32 beta = utils.gammaToHash(proof[0], proof[1]);
        uint256 randomness = uint256(beta);
        alreadyFulfilled[requestId] = true;
        emit RandomnessRequestFulfilled(requestId, randomness);
    }
}
`;

export const vrf = { oracle, contract };
