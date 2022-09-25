import fetch from "node-fetch";

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
 * Kenshi Deep Index endpoint
 */
const response = await fetch(endpoint, {
  method: "POST",
  body: JSON.stringify(request),
});

/**
 * Receive the data and print it
 */
const data = await response.json();
console.log(data);
