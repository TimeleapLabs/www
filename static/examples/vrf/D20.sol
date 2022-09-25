//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;

import "@kenshi.io/vrf-consumer/contracts/VRFConsumer.sol";

contract D20 is VRFConsumer {
    mapping(uint256 => address) requests;
    address _owner;

    constructor() {
        _owner = msg.sender;
    }

    /**
     * @dev this function can be used to pass config parameters
     * to the Kenshi VRF library
     */
    function setVRFConfig(address coordinator) public {
        require(msg.sender == _owner, "Only owner");
        setupVRF(coordinator);
    }

    /**
     * @dev rolls a D20, requests a random number from the Kenshi VRF coordinator
     * and maps the `requestId` of the VRF request to the message sender
     */
    function roll() public {
        uint256 requestId = requestRandomness();
        requests[requestId] = msg.sender;
    }

    event Rolled(address addr, uint8 number);

    /**
     * @dev receives `requestId` and `randomness` from the Kenshi VRF coordinator,
     * gets the original message sender, converts the randomness to a number between
     * 1 and 20, and emits an event as the D20 roll result for this `requestId`
     */
    function fulfillRandomness(uint256 requestId, uint256 randomness)
        internal
        override
    {
        address addr = requests[requestId];
        uint8 number = uint8(1 + (randomness % 20));
        emit Rolled(addr, number);
    }
}
