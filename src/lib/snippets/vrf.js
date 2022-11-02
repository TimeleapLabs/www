export const vrf = `//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

import "@kenshi.io/vrf-consumer/contracts/VRFConsumer.sol";

contract D20 is VRFConsumer {
    constructor() {
        setupVRF(VRFCoordinatorAddress);
    }

    function getRandomness() public {
        uint256 requestId = requestRandomness();
    }

    function fulfillRandomness(uint256 requestId, uint256 randomness) internal override {
        // Process randomness here!
    }
}`;
