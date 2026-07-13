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
    *   **Docker Compose** (v2, the `docker compose` command).
    *   **MongoDB**: A database used by `bch-dex` to store and manage local data and user accounts. MongoDB runs inside a Docker container, so no separate installation is needed.

### Installation Steps

The installation process involves several steps, primarily executed via the command line.

1.  **Install Node.js, Docker, and Docker Compose**: Follow the instructions provided in [this gist](https://gist.github.com/christroutner/a39f656850dc022b60f25c9663dd1cdd). Ensure Node.js version 20 or higher is installed.

2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Permissionless-Software-Foundation/bch-dex
    cd bch-dex
    ```

3.  **Create a Custom Branch (Recommended)**:
    If you plan to customize the deployment (e.g., operator address, Dockerfile changes), create a branch to track your changes:
    ```bash
    git checkout -b my-deployment
    ```

4.  **Install Dependencies**:
    ```bash
    npm install
    ```

5.  **Create an Application Wallet**:
    Navigate to the `production/scripts` folder and run the `create-wallet.js` script:
    ```bash
    cd production/scripts
    node create-wallet.js
    ```
    This creates a `wallet.json` file. This wallet does not need to be funded with BCH to operate, but the operator address (see Configuration) should be funded to cover transaction fees if the server will be making trades.

6.  **Configure the Operator (Optional but Recommended)**:
    Edit `production/docker/bch-dex/start-production.sh` and add the following environment variables before the `npm start` line:
    ```bash
    export OPERATOR_ADDRESS=bitcoincash:qzauj67nsqqmtu2pql7wcak3ct7lu2fppqkj0xwvwl
    export OPERATOR_PERCENTAGE=10.0
    ```
    - `OPERATOR_ADDRESS`: The BCH address that receives a percentage of each trade as a fee.
    - `OPERATOR_PERCENTAGE`: The percentage (as a decimal, e.g., 10.0 = 10%) of each trade that goes to the operator.

7.  **Build Docker Containers**:
    Change directory to `production/docker`:
    ```bash
    cd ../docker
    ```
    Build the backend and frontend containers separately to avoid issues:
    ```bash
    docker compose build --no-cache bch-dex
    docker compose build --no-cache dex-ui
    ```

8.  **Start Docker Containers**:
    ```bash
    docker compose up -d
    ```
    This brings up three containers:
    - `mongo-dex` — MongoDB database
    - `bch-dex` — Backend REST API
    - `dex-ui` — Seller front end (served by nginx on port 4500)

    Verify they are running:
    ```bash
    docker ps
    ```

9.  **Wait for Network Sync**: The backend will take approximately **10 minutes to sync** with the network and discover existing NFTs and fungible tokens for sale. You can check logs using:
    ```bash
    docker logs -f bch-dex
    ```

### Accessing and Using the DEX

1.  **Open Web Browser**: Once the containers are running, navigate to `http://localhost:4500` in a web browser.
2.  **Create an Account**: On the login screen, click the "sign up" tab. Enter an email and password to create a user account. This information is stored locally.
3.  **Fund Your Wallet**: After logging in, go to the BCH page to get your Bitcoin Cash (BCH) address. Fund your wallet with a small amount of BCH (e.g., 10 cents or less) for transaction fees. Send your fungible and NFT tokens to your address; they will appear on your tokens page.
4.  **List Tokens for Sale**: For each token that appears in your wallet, there will be a "sell" button. Clicking this button will list the token on the DEX.

### Customizing the Seller Front End (dex-ui)

The Seller front end is built from the [bch-dex-ui-v3](https://github.com/Permissionless-Software-Foundation/bch-dex-ui-v3) repository. The Dockerfile in `production/docker/bch-dex-ui/` clones this repo and builds it. You can customize it by:

1. Forking the repository to your own GitHub account.
2. Creating a branch with your customizations.
3. Updating the Dockerfile to point to your fork and branch:
   ```dockerfile
   RUN git clone https://github.com/YOUR_ORG/bch-dex-ui-v3
   RUN git checkout your-branch
   ```

The front end uses the `REACT_APP_DEX_SERVER` environment variable (set in `.env.production`) to know which API server to call. By default it points to `https://dex-api.fullstack.cash`. If you are running your own server, update this to point to your server's URL.

### Exposing the Server to the Internet

To make your DEX accessible from the internet, you will need:

1. **A domain name** with DNS pointing to your server's public IP.
2. **A reverse proxy** (like nginx) to route traffic to the Docker containers.
3. **SSL certificates** (e.g., from Let's Encrypt) for HTTPS.

A typical nginx configuration for proxying to the Docker containers looks like this:

```nginx
# API backend
server {
    listen 443 ssl http2;
    server_name dex-api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5700;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
}

# Seller front end
server {
    listen 443 ssl http2;
    server_name dex-seller.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:4500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Buyer Front End

The Buyer wallet is a separate static web app from the [bch-dex-taker-v2](https://github.com/Permissionless-Software-Foundation/bch-dex-taker-v2) repository. It does not require a Docker container — it is a static site that can be served by any web server (nginx, Apache, etc.).

To build and deploy it:

```bash
git clone https://github.com/Permissionless-Software-Foundation/bch-dex-taker-v2
cd bch-dex-taker-v2

# Configure the API server URL
# Edit .env.production and set:
#   REACT_APP_DEX_SERVER=https://dex-api.yourdomain.com
#   REACT_APP_NOSTR_REST_API_URL=https://nostr.yourdomain.com

npm install
npm run build
```

The built files will be in the `build/` directory. Copy them to your web server's document root.

### Further Resources and Support

*   **Telegram Channel**: For feedback, help, or discussing technical aspects of the software, you can reach out via the [BCHJS toolkit channel on Telegram](https://t.me/bch_js_toolkit).
*   **Video Resources**: More videos are available and planned to cover the intricacies of selling different token types, creating them, and importing them from other sites like [memo.cash](https://memo.cash) and [TokenTiger.com](https://tokentiger.com).
*   **Developer Participation**: This is an open-source project, and JavaScript developers are encouraged to participate in its creation and maintenance.

---
