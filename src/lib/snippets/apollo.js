export const apollo = `import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core/core.cjs";

const client = new ApolloClient({
  uri: "https://api.kenshi.io/index/graphql",
  cache: new InMemoryCache(),
});

const query = gql\`
  {
    getEntries(blockchain: "binance-mainnet") {
      event {
        name
      }
    }
  }
\`;

const { data } = client.query({ query });`;
