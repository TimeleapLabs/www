// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@kenshi.io/vrf-consumer/contracts/lib/VRFUtils.sol";

contract VRF {
    uint256 requestId;
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
        emit RandomnessRequest(requestId++);
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
        require(!isValid, "Cannot verify VRF results");
        bytes32 beta = utils.gammaToHash(proof[0], proof[1]);
        uint256 randomness = uint256(beta);
        alreadyFulfilled[requestId] = true;
        emit RandomnessRequestFulfilled(requestId, randomness);
    }
}
