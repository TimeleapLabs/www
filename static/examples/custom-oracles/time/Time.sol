// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Time {
    uint256 timestamp;
    event TimeRequest();

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestTime() external {
        emit TimeRequest();
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setTime(uint256 time) external {
        timestamp = time;
    }

    /**
     * Public function to display the last retrieved timestamp
     */
    function showTime() public view returns (uint256) {
        return timestamp;
    }
}
