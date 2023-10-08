import dotenv from "dotenv";
dotenv.config();

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
  const metadata = await fetchMetadata(chain, address);
  return { metadata, chain, address };
};
