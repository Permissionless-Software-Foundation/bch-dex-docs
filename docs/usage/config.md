---
sidebar_position: 4
---

# Configuration

[bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex) and [xec-dex](https://github.com/Permissionless-Software-Foundation/xec-dex) has several configuration settings set in its [start-production.sh](https://github.com/Permissionless-Software-Foundation/bch-dex/blob/master/production/docker/bch-dex/start-production.sh) startup script and [common.js](https://github.com/Permissionless-Software-Foundation/bch-dex/blob/master/config/env/common.js) config file. This page describes the different configuration settings.

Note: Environment variables can also be set in the [docker-compose.yml](https://github.com/Permissionless-Software-Foundation/bch-dex/blob/master/production/docker/docker-compose.yml) file.

## Blockchain Infrastructure

The DEX software needs to periodically check Offers against the blockchain, to ensure they are still valid. The DEX software uses the [Cash Stack](https://cashstack.info) to connect to its underlying blockchain infrastructure. There is both a web2 and a web3 implementation of the Cash Stack.

### Web3
By default, the DEX uses the web3 Cash Stack. These are free, public servers maintained by members of the [PSF](https://psfoundation.cash). The server is chosen by setting the **CONSUMER_URL** to the URL of an instance of [ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer), like this:

- `export CONSUMER_URL=https://free-bch.fullstack.cash/`

Here are lists of free, public web3 Cash Stack servers maintained by the PSF community:
- [BCH web3 Cash Stack servers](https://gist.github.com/christroutner/63c5513782181f8b8ea3eb89f7cadeb6)
- [XEC web3 Cash Stack servers](https://gist.github.com/christroutner/621bb9d64e2642b9f0d30e67c33a9d6c)


### Web2
If a user has access to a local web2 Cash Stack, or to [private infrastructure hosted by FullStack.cash](https://fullstack.cash/pricing), they can configure the DEX to use that infrastructure. This often results in faster and more reliable performance, which is highly desirable when using the DEX in a commercial setting.

To configure the use of a web2 Cash Stack, the following environment variables should be set:

- `export USE_FULLSTACKCASH=1`

#### Self Hosted Infrastructure
You can run your own local instance of the web2 Cash Stack. [Video instructions](https://psfoundation.cash/video/) are provided for setting up each subcomponent of the Cash Stack. To connect the DEX to your local infrastructure, set the following environment variables:

- `export APISERVER=<REST API URL for your infra>`

This configuration setting assumes that you are running [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) with rate-limits turned off.

#### FullStack Account
If using a [FullStack.cash Tiered Account](https://fullstack.cash/pricing), the following environment variables should be set:

- `export GET_JWT_AT_STARTUP=1`
- `export FULLSTACKLOGIN=<your fullstack.cash login email>`
- `export FULLSTACKPASS=<your fullstack.cash password>`

With those environment variables set, the DEX will log into FullStack.cash at startup and will retrieve a JWT token to access the BCH REST API. It will automatically renew the JWT token to ensure it can maintain access to the BCH blockchain infrastructure.

#### FullStack Private Infrastructure
If using [private, isolated infrastructure hosted by FullStack.cash](https://fullstack.cash/pricing), the following environment variables should be set:

- `export APISERVER=<REST API url provided by FullStack.cash>`
- `export FULLSTACK_AUTH_PASS=<Authentication password provided by FullStack.cash>`

## Ports
The ports used by the DEX are configurable. It's desirable to change the default ports on computer systems that run many Docker containers, in order to avoid port conflicts.

The default ports are the following:
- 5667 - DEX REST API. This is used by the UI to control the DEX.
- 5666 - MongoDB is used to store data on Orders and Offers.
- 5010 - The DEX uses this port to communicate with the P2WDB.

The ports can be changed by setting the following environment variables. These are presented in the same order as the defaults above.

- `export PORT=5667`
- `export MONGO_PORT=5666`
- `export P2WDB_PORT=5010`

Note: These settings will not change the ports in the `docker-compose.yml` file. Those will need to be changed separately.

## P2WDB
As illustrated in the [dev docs](https://github.com/Permissionless-Software-Foundation/bch-dex/tree/master/dev-docs), the DEX synchronizes with all other instances of the DEX through the pay-to-write database (P2WDB). There is constant communication between the DEX and P2WDB. These environment variables control these communication settings:

- **WEBHOOKSERVICE** is the URL for the webhook REST API provided by the *local* P2WDB. This is used by the DEX to register a new webhook at startup. The webhook triggers when new DEX data is received by the P2WDB.
- **WEBHOOKTARGET** is the URL that should be called by the P2WDB webhook, when new data arrives. This is how the P2WDB passes new Offer and Counter Offer data to the DEX.
- **P2WDB_URL** is used for writing data to the P2WDB. By default, this points to the P2WDB instance hosted by FullStack.cash, so that writes can be paid for in native cryptocurrency. It can be switched to the local instance of the P2WDB, but the P2WDB wallet must possess PSF tokens to execute a valid write.

## IPFS Gateway
The `IPFS_GATEWAY` environment variable is used to retrieve data about tokens. This variable can be set to any public IPFS gateway. By default it is set to the following:

- `export IPFS_GATEWAY=https://p2wdb-gateway-678.fullstack.cash/ipfs/`

The above URL is a gateway for retrieving data that is pinned using the P2WDB Pinning Service.
