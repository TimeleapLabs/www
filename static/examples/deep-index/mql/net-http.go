package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  /**
   * This is the Kenshi Deep Index endpoint for MQL
   */
  endpoint := "https://api.kenshi.io/index/mql"

  /**
   * Define your MQL request here
   */
  var mql = []byte(`{
        "blockchain": "binance-mainnet",
        "owner": "YOUR_WALLET_ADDRESS",
        "apikey": "YOUR_API_KEY",
        "query": {
          "event.name": "Transfer",
          "block.number": {
            "$gte": 20740000
          }
        }
      }`)

  /**
   * Post request sending the MQL request to the
   * Kenshi Deep Index endpoint, receive the data and print
   */
  req, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(mql))
  req.Header.Set("Content-Type", "application/json; charset=UTF-8")

  client := &http.Client{}
  resp, err := client.Do(req)

  if err != nil {
    panic(err)
  }

  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}
