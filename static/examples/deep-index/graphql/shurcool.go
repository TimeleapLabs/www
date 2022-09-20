package main

import (
  "context"
  "fmt"

  "github.com/shurcool/graphql"
)

func main() {
  /**
   * This is the Kenshi Deep Index endpoint for GraphQL
   */
  endpoint := "https://api.kenshi.io/index/graphql"

  /**
   * Create a GraphQL client to connect to the GraphQL endpoint
   */

  client := graphql.NewClient(endpoint, nil)

  /**
   * Define your GraphQL query here
   */
  var query struct {
    GetEntries []struct {
      Event struct {
        Name graphql.String
      }
    } `graphql:"getEntries(blockchain: \"binance-testnet\", apikey: \"YOUR_API_KEY\", owner: \"YOUR_WALLET_ADDRESS\")"`
  }

  /**
   * Send the query to the GraphQL server
   */
  err := client.Query(context.Background(), &query, nil)

  /**
   * Check for errors and print the retrieved data
   */
  if err != nil {
    fmt.Println(err)
  } else {
    fmt.Println(query.GetEntries)
  }
}
