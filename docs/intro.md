---
sidebar_position: 1
slug: /
---

# Introduction

The [Permissionless Software Foundation](https://psfoundation.cash) maintains a DEX software on the Bitcoin Cash (BCH) blockchain, which leverages the [SWaP trading protocol](/swap). This protocol let's *individuals* trade tokens in a peer-to-peer fashion. These DEXs have the following properties:

- **peer-to-peer** - trades take place between two individuals. There is no company, liquidity pool, or other intermediary between the two.
- **trustless** - Neither individual needs to know or trust the other person. There is no way one person can gain an advantage over the other during the trade.
- **atomic** - There are only two states to a trade. Each person either has their original coins, or the token they are trying to exchange. There is no way the trade can be in a state where funds get stuck.

## Software

There are two different versions of the DEX software:

- The [Buyer web wallet](/usage/buyer-wallet) is a *non-custodial* wallet that lets you browse and purchase tokens for sale on the network. Simply load the wallet with enough BCH and click the *Buy* button on a listed token. If the Seller software is live on the network, you'll soon have your token.

- The [Seller wallet](/usage/seller-wallet) has one little catch: the Seller's software needs to be online in order to finalize the sale. To solve this problem, a single person can run a Server and provide *joint-custody* of a wallet with a Seller. Anyone can run a Server, which stays online and provides a good experience for both Sellers and Buyers. A Server can provide multiple Seller accounts.
