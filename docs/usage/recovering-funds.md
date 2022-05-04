---
sidebar_position: 4
---

# Recovering Funds

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
