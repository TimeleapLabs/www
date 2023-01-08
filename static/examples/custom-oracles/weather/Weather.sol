// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Weather {
    event WeatherRequest(uint256 lat, uint256 long);
    event WeatherRequestFulfilled(
        uint256 lat,
        uint256 long,
        uint256 temperature
    );

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     *
     * Note: Solidity doesn't have floating point numbers,
     * we assume lat and long are multiplied by 100 to elliminate
     * the decimal part of them
     */
    function requestWeather(uint256 lat, uint256 long) external {
        emit WeatherRequest(lat, long);
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setWeather(
        uint256 lat,
        uint256 long,
        uint256 temperature
    ) external {
        emit WeatherRequestFulfilled(lat, long, temperature);
    }
}
