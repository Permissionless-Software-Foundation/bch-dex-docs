---
sidebar_position: 3
---

# Server

Running a Server requires a significant level of setup. Currently it requires a computer running Ubuntu Linux. A Server can support a single Seller, or many Sellers. A Seller's software must be online in order to respond to Counter Offers from Buyers.

## Prerequisites

The setup instructions assumes you are starting with an Ubuntu Linux computer that has node.js v20+, Docker, and Docker Compose installed. This list of links will help you install these prerequisites on your own Ubuntu installation.

- [Install Docker and other software](https://youtu.be/w5mpwX4vUIg) based on [these instructions](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd)

## Overview
Running the DEX Seller wallet requires composition of these different software packages. These software packages are orchestrated using Docker and Docker Compose.

- [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) - This repository is the back end software that tracks trade data on the network, generates Offers and Counter Offers, and finalizes trades by accepting Counter Offers.
- [bch-dex-ui-v3](https://github.com/Permissionless-Software-Foundation/bch-dex-ui-v3) is a graphical user interface (GUI) for the bch-dex, otherwise known as the Seller wallet.
- [MongoDB](https://www.mongodb.com/) is a database used by the DEX to store and manage local data.

## Installation
If you are selling tokens on the Bitcoin Cash blockchain, you'll want to clone the [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) repository with these commands:

- `git clone https://github.com/Permissionless-Software-Foundation/bch-dex`
- `cd bch-dex`

For step-by-step written instructions, read through the [README instructions](https://github.com/Permissionless-Software-Foundation/bch-dex) for the repository of your chosen blockchain.

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


