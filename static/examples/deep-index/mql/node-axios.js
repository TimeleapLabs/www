import axios from "axios";

/**
 * This is the Kenshi Deep Index endpoint for MQL
 */
const endpoint = "https://api.kenshi.io/index/mql";
const apikey = "YOUR_API_KEY";
const owner = "YOUR_WALLET_ADDRESS";

/**
 * Define your MQL request here
 */
const request = {
  blockchain: "binance-mainnet",
  owner,
  apikey,
  query: {
    "event.name": "Transfer",
    "block.number": { $gte: 20740000 },
  },
};

/**
 * Post request sending the MQL request to the
 * Kenshi Deep Index endpoint, receive the data and print
 */
const data = await axios.post(endpoint, request);
console.log(data);
