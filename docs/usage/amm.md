---
sidebar_position: 4
---

# Automated Market Maker (AMM)

The Automated Market Maker (AMM) is a separate and optional [piece of software](https://github.com/Permissionless-Software-Foundation/dex-amm) that can be run on the same computer as the Seller Wallet. It communicates with the DEX software in order to maintain a set or Orders. If an Order is taken by a Buyer, the AMM will replace the Order with an identical one. If the price fluctuates outside of a tolerance level (usually 5%), the AMM will delete the Order and replace it with a new one at the new price.

Orders are maintained through a JSON file. Here is an example of an `orders.json` file that instructs the AMM to maintain orders for a single token class ([a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2](https://slp-token.fullstack.cash/?tokenid=a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2)) in the following quantities: 0.1, 1, and 2 tokens. The price for the token is set to $0.01 USD per token. If the price deviates by more than 5%, the AMM will delete the existing Order and recreate a new Order at the current price.

```json
[
  {
    "tokenId": "a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2",
    "qty": 0.1,
    "pricePerToken": 0.01,
    "errorPercent": 0.05,
    "markup": 0.00,
    "priceAlgo": false
  },
  {
    "tokenId": "a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2",
    "qty": 1,
    "pricePerToken": 0.01,
    "errorPercent": 0.05,
    "markup": 0.00,
    "priceAlgo": false
  },
  {
    "tokenId": "a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2",
    "qty": 2,
    "pricePerToken": 0.01,
    "errorPercent": 0.05,
    "markup": 0.00,
    "priceAlgo": false
  }
]
```

## Installation

For the AMM to operate, you must first [setup a Seller Wallet](/usage/seller-wallet), and have the Docker containers up and synced.

- Clone the repository.
  - `git clone https://github.com/Permissionless-Software-Foundation/dex-amm`
- Customize your own `orders.json` file and add it to the root directory of the repository.
  - `cd dex-amm`
  - `cp ~/orders.json orders.json`
- Pull down the Docker image for the AMM.
  - `cd production/docker`
  - `docker-compose pull`
- Run the Docker container.
  - `docker-compose up -d`

Once the Docker container is up and running, you can monitor it with this command:
- `docker logs --tail 20 -f dex-amm`

The AMM will check the DEX every 10 minutes. It will only modify one order per check.
