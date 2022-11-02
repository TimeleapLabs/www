export const mql = `import axios from "axios";

const request = {
  blockchain: "binance-mainnet",
  query: {
    "event.name": "Transfer",
    "block.number": { $gte: 20740000 },
  },
};

const data = await axios.post("https://api.kenshi.io/index/mql", request);`;
