// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Balance {
    event BalanceRequest(address user, address token);
    event BalanceRequestFulfilled(address user, address token, uint256 balance);

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestBalance(address user, address token) external {
        emit BalanceRequest(user, token);
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setBalance(
        address user,
        address token,
        uint256 balance
    ) external {
        emit BalanceRequestFulfilled(user, token, balance);
    }
}
