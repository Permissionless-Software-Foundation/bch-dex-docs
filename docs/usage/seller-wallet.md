---
sidebar_position: 2
---

# Seller Wallet

Selling tokens requires a significant level of setup. It's hoped that an Android app for selling tokens will be developed in the future, but currently it requires a computer running Ubuntu Linux. A seller's software must be online in order to respond to Counter Offers from buyers.

## Prerequisites

The setup video below assumes you are starting with an Ubuntu Linux computer that has node.js, Docker, and Docker Compose installed. This list of links will help you install these prerequisites on your own Ubuntu installation.

- [Install Docker and other software](https://youtu.be/w5mpwX4vUIg) based on [these instructions](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd)

## Overview
Running the DEX Seller wallet requires composition of these different software packages. These software packages are orchestrated using Docker and Docker Compose.

- [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) or [xec-dex](https://github.com/Permissionless-Software-Foundation/xec-dex) - This repository is the back end software that tracks trade data on the network, generates Offers and Counter Offers, and finalizes trades by accepting Counter Offers.
- [bch-dex-ui](https://github.com/Permissionless-Software-Foundation/bch-dex-ui) or [ecash-dex-ui](https://github.com/Permissionless-Software-Foundation/ecash-dex-ui) is a graphical user interface (GUI) for the DEX, otherwise known as the Seller wallet.
- [P2WDB](https://p2wdb.com) is a censorship-resistant database used to communicate trade data between peers running bch-dex.
- [IPFS](https://ipfsio) is a censorship-resistant network for communicating data over the internet.
- [MongoDB](https://www.mongodb.com/) is a database used by both P2WDB and the DEX to store and manage local data.

## Installation
If you are selling tokens on the Bitcoin Cash blockchain, you'll want to clone the [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) repository with these commands:

- `git clone https://github.com/Permissionless-Software-Foundation/bch-dex`
- `cd bch-dex`

If you are selling tokens on the eCash blockchain, you'll want to clone the [xec-dex](https://github.com/Permissionless-Software-Foundation/xec-dex) repository with these commands:

- `git clone https://github.com/Permissionless-Software-Foundation/xec-dex`
- `cd xec-dex`

The installation of either blockchain is identical from this point. Follow the instructions in the video. For step-by-step written instructions, read through the README instructions for the repository of your chosen blockchain.

From a high level, the following steps are required:

- Install npm dependencies
- Create a new wallet for the DEX
- Pull down the Docker images
- Briefly run the Docker containers in order generate the IPFS config file
- Edit the IPFS config file to open port 5001
- Start the Docker containers and wait for the P2WDB and DEX to sync
- Open the Seller Wallet UI at http://localhost:4500
- Port the DEX wallet 12-word mnemonic into the Seller Wallet UI

Once those setup steps are complete, you can begin to sell tokens on the DEX. The video below walks through the above steps.

<iframe width="731" height="411" src="https://www.youtube.com/embed/084N0el6hkg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Recovering Funds

Whenever an *Offer* or a *Counter Offer* is generated, the funds are moved to a [child address of the HD wallet](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc#hd-wallets-bip-32bip-44), to protect the UTXO until the sale has been completed. You can recover those funds and *sweep* them into the root address used by the web wallet by running the [`sweep-wallet.js` script](https://github.com/Permissionless-Software-Foundation/bch-dex/blob/master/production/scripts/sweep-wallet.js) in the `production/scripts` directory:

- `node sweep-wallet.js`

**Warning**: This will destroy all Offers and Counter Offers on the DEX associated with your wallet.

You should see an output similar to this:

```
Sweeping all funds into root address bitcoincash:qr2xgcdldf0n4rswp6fts4r944ukjmxtwc5e8yyxds...

Sweeping bitcoincash:qzq5yzrjwtmvflx0v5kslp8k8462fcm5fyzc4wv347
Not enough BCH found on paper wallet. Sweeping with BCH from the reciever wallet.
Swept HD index 1. TXID: c49ad480e18597139b05841f032a64721e33e5e63d493a8b4daca60edab74588

```
