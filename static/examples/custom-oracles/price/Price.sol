// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Price {
    event PriceRequest();
    event PriceRequestFulfilled(uint256 price);

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestPrice() external {
        emit PriceRequest();
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setPrice(uint256 price) external {
        emit PriceRequestFulfilled(price);
    }
}
