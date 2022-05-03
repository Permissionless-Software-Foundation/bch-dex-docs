---
sidebar_position: 3
---

# Filecoin

[Filecoin](https://filecoin.io/) is a decentralized blockchain for file storage. It's based on [IPFS](https://ipfs.io/). Uploading files to Filecoin is a great way to circumvent attempts at censorship, and ensure files are available over a long period of time.

[web3.storage](https://web3.storage/) is the easiest way to upload files to the Filecoin blockchain. The site offers 1 TB of storage for free with a GitHub account (also free). Files can be uploaded manually, or algorithmicly via the [web3.storage JavaScript libary](https://www.npmjs.com/package/web3.storage). Uploaded files are immediately pinned to IPFS, and the files are stored with three redundant miners.

This website is uploaded to the Filecoin network and made available over IPFS. Files are uploaded using [this public file](https://github.com/christroutner/trouts-blog/blob/main/publish.js), which is executed by running the `npm run pub` command. [This redirect file](https://github.com/christroutner/trouts-blog/blob/main/redirect/index.html) is what is served at [troutsblog.com](https://troutsblog.com/), which looks up the latest version and redirects the user to the website served on IPFS.

Once a file is uploaded to Filecoin, the file is identified by a cryptographic hash called a content ID (CID). The content can then be served by any computer that has a file matching that CID, and retrieved from any IPFS gateway. Anyone can set up an IPFS gateway, and many great ones are publicly available.

Individuals can help fight censorship by [pinning](https://docs.ipfs.io/concepts/persistence/#pinning-in-context) the CID to their own IPFS node. They will then download and start serving that content, making it more difficult for State actors to prevent the content from being distributed. IPFS also contains a swiss-army knife of network tools, allowing it to puch holes through firewalls, which are another common way that State actors attempt to censor content.
