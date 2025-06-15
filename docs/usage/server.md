---
sidebar_position: 3
---

# Server

<iframe width="639" height="359" src="https://www.youtube.com/embed/zkJT78zzmVw" title="Selling NFTs (simple)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>


This document summarizes the process of self-hosting the [bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex), a decentralized exchange for permissionless trading of SLP tokens and NFTs. Installing and running your own instance of the DEX, gives you full control and independence from third parties.

### What is bch-dex?
[bch-dex](https://github.com/Permissionless-Software-Foundation/bch-dex), also referred to as SLP DEX, is a **decentralized exchange** that allows users to trade **SLP tokens, NFTs, and fungible tokens**. It is designed for **trustless, anonymous, and atomic trading** between individuals. The software is entirely based on open protocols and open-source software, maintained by the [Permissionless Software Foundation](https://psfoundation.info). It's a backend REST API web service that monitors Nostr relays for trading signals, inspired by the [SWaP Protocol](/swap).

### Important Considerations

*   **Beta Status**: As of the recording, the code is still a little unstable but is functional and in open beta. Development is active, and things may constantly change and break.
*   **Seller Online Requirement**: To finalize a transaction, the **seller must be online**. The buyer does not need to be. This is why the DEX needs to be hosted somewhere and remain online constantly if you plan to sell tokens.
*   **Decentralization**: All information, including user accounts, is stored locally on your bch-dex instance and not sent to a third party.

### Technical Requirements for Self-Hosting

To self-host the bch-dex, you will need to be a little technical and use Linux.

*   **Operating System**: Ubuntu 20 or a higher version of Ubuntu is recommended. It might also work on Mac and Windows, though these are not as easily supported. Ubuntu 20 is suitable for virtual private servers, old desktops, or even small embedded computers like the Raspberry Pi.
*   **Hardware**: The target hardware is amd64 (normal desktop PCs).
*   **Required Software**:
    *   **Node.js**: Version 20 or higher.
    *   **Docker**.
    *   **Docker Compose**.
    *   **MongoDB**: A database used by `bch-dex` to store and manage local data and user accounts.

### Installation Steps

The installation process involves several steps, primarily executed via the command line.

1.  **Install Node.js, Docker, and Docker Compose**: Follow the instructions provided in [this gist](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd). Ensure Node.js version 20 or higher is installed.
2.  **Clone the Repository**:
    *   Go to the `bch-dex` repository at `github.com/Permissionless-Software-Foundation/bch-dex`.
    *   Use `git clone https://github.com/Permissionless-Software-Foundation/bch-dex` and then `cd bch-dex`.
3.  **Install Dependencies**: Run `npm install`.
4.  **Create an Application Wallet**:
    *   Navigate to the `production/scripts` folder.
    *   Run the `create-wallet.js` script (`node create-wallet.js`) to create a `wallet.json` file. This wallet does not need to be funded.
5.  **Build Docker Containers**:
    *   Change directory to `production/docker`.
    *   **Pull MongoDB Image**: This step, `docker-compose pull`, ensures the MongoDB image is available.
    *   **Build Backend**: Use `docker-compose build --no-cache bch-dex` to build the `bch-dex` (backend) container image.
    *   **Build Frontend**: Use `docker-compose build --no-cache dex-ui` to build the `dex-ui` (frontend) container image. Building them separately is recommended to avoid issues.
6.  **Start Docker Containers**: Run `docker-compose up -d` to bring up both the backend and frontend containers, along with the MongoDB database container.
    *   You can verify running containers with `docker ps`. This should show the database, bch-dex (backend), and DEX UI (frontend) containers.
7.  **Wait for Network Sync**: The backend will take approximately **10 minutes to sync** with the network and discover existing NFTs and fungible tokens for sale. You can check logs using `docker logs -f bch-dex`.

### Accessing and Using the DEX

1.  **Open Web Browser**: Once the containers are running, navigate to `http://localhost:4500` in a web browser.
2.  **Create an Account**:
    *   On the login screen, click the "sign up" tab.
    *   Enter an email and password to create a user account. This information is stored locally.
3.  **Fund Your Wallet**:
    *   After logging in, go to the BCH page to get your Bitcoin Cash (BCH) address.
    *   Flip the toggle to get a Simple Ledger Protocol (SLP) address.
    *   **Fund your wallet with a small amount of BCH** (e.g., 10 cents or less) for transaction fees.
    *   **Send your fungible and NFT tokens to your address**; they will appear on your tokens page.
4.  **List Tokens for Sale**: For each token that appears in your wallet, there will be a "sell" button. Clicking this button will list the token on the DEX.

### Further Resources and Support

*   **Telegram Channel**: For feedback, help, or discussing technical aspects of the software, you can reach out via the [BCHJS toolkit channel on Telegram](https://t.me/bch_js_toolkit).
*   **Video Resources**: More videos are available and planned to cover the intricacies of selling different token types, creating them, and importing them from other sites like [memo.cash](https://memo.cash) and [TokenTiger.com](https://tokentiger.com).
*   **Developer Participation**: This is an open-source project, and JavaScript developers are encouraged to participate in its creation and maintenance.

---