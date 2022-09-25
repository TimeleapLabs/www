import requests

# This is the Kenshi Deep Index endpoint for MQL
endpoint = "https://api.kenshi.io/index/mql"

# Define your MQL query here
request = {
    "blockchain": "binance-mainnet",
    "owner": "YOUR_WALLET_ADDRESS",
    "apikey": "YOUR_API_KEY",
    "query": {
        "event.name": "Transfer",
        "block.number": {"$gte": 20740000},
    },
}

# Post request sending the MQL request to the
# Kenshi Deep Index endpoint
response = requests.post(endpoint, json=request)

# Receive the data and print it
data = response.json()
print(data)