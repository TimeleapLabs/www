import dotenv from "dotenv";
dotenv.config();

const endpoint = "https://api.kenshi.io/index/mql";
const apikey = process.env.KENSHI_API_KEY;
const owner = "0x51DD193630806aDCFFa9E72569a71A9c12591C33";

const fetchTransactions = async (chain, address) => {
  /**
   * Define your MQL request here
   */
  const request = {
    blockchain: `${chain}-mainnet`,
    owner,
    apikey,
    query: { "event.name": "Transfer", "block.address": address },
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
  return await response.json();
};

const fetchMetadata = async (chain, address) => {
  const query = `{
      getUserSubs(
        analytics: true,
        filter: [["raw.chain", "${chain}-mainnet"], ["raw.address", "${address}"]]) {
        analytics {
          metadata {
            twitter
            telegram
            discord
            buylink
            website
            description
            summary
            name
            symbol
            logo
          }
        }
      }
    }`;

  const response = await fetch("https://api.kenshi.io/subscriptions", {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data?.getUserSubs?.analytics?.pop?.()?.metadata;
};

export const load = async ({ params }) => {
  const { address, chain } = params;
  const transactions = await fetchTransactions(chain, address);
  const metadata = await fetchMetadata(chain, address);
  return { transactions, metadata };
};
