---
sidebar_position: 3
---

# Install bch-dex

Running the DEX requires composition of these different software packages:
- [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) - A REST API and back end software that tracks trade data on the network, generates [Offers and Counter Offers](https://github.com/Permissionless-Software-Foundation/bch-dex/tree/ct-unstable/dev-docs#definitions), and finalizes trades by accepting Counter Offers.
- [bch-dex-ui](https://github.com/Permissionless-Software-Foundation/bch-dex-ui) is a [Gatsby](https://www.gatsbyjs.com/) web app and user interface (UI) for bch-dex.
- [P2WDB](https://github.com/Permissionless-Software-Foundation/ipfs-p2wdb-service) is a censorship-resistant database used to communicate trade data between peers running bch-dex.
- [IPFS](https://ipfs.io/) is a censorship-resistant network for communicating data over the internet.
- [MongoDB](https://www.mongodb.com/) is a database used by both P2WDB and bch-dex to store and manage local data.

The above software is orchestrated using [Docker](https://www.docker.com/) and Docker Compose. Instructions for setting up Node.js, Docker, and Docker Compose can be found in [this Gist](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd) and [this walk-through video](https://youtu.be/w5mpwX4vUIg).

Here are the steps involved in setting up bch-dex:

1. Follow the direction in [this Gist](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd) to install Node.js, Docker, and Docker Compose.
1. Clone the repository with `git clone https://github.com/Permissionless-Software-Foundation/bch-dex` and enter it with `cd bch-dex`.
1. Install dependencies by running `npm install`
1. Enter the `scripts` folder: `cd production/scripts`
1. Create a new wallet: `node create-wallet.js`
1. Change directory to the `production/docker` or `production/rpi-docker` folder depending on your hardware target.
1. Pull the Docker images down from Docker Hub: `docker-compose pull`
1. Start the Docker containers with `docker-compose up -d`
1. Wait for the P2WDB to sync and populate bch-dex with trade data. You can monitor it with `docker logs --tail 20 -f p2wdb`.
1. Open a web browser and navigate the `http://localhost:4500`. You'll be able to see new Offers as they come in and are detected by bch-dex.
1. Add the 12-word mnemonic from the `wallet.json` file to the the web wallet, which will mirror your wallet in the UI, and allow you to perform basic wallet functions (send and receive BCH and tokens).
