/*
  This service file contains functions for retrieving an IPFS hash from the
  BCH blockchain, in a fasion similar to PS001:
  https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps001-media-sharing.md
*/

// const BchWallet = require('minimal-slp-wallet')
// const BchMessage = require('bch-message-lib')

class Memo {
  constructor(config) {
    this.config = config
  }

  async initialize() {
    try {
      const BchWallet = typeof window !== 'undefined' ? window.SlpWallet : null
      const BchMessage = typeof window !== 'undefined' ? window.BchMessage : null

      // Throw an error if this class is instantiated without passing a BCH address.
      if (!this.config || !this.config.bchAddr)
        throw new Error(`Must pass a BCH address to Memo constructor.`)
      else this.bchAddr = this.config.bchAddr

      this.wallet = new BchWallet(undefined, {
        interface: 'consumer-api',
      })
      this.bchjs = this.wallet.bchjs

      this.bchMessage = new BchMessage({ wallet: this.wallet })
    } catch(err) {
      console.error('Error in get-cid.js/initialize(): ', err.message)
      console.log('Waiting 5 seconds before trying again.')
      await this.sleep(5000)
      this.initialize()
    }
  }

  // Walk the transactions associated with an address until a proper IPFS hash is
  // found. If one is not found, will return false.
  async findHash() {
    try {
      console.log(`finding latest IPFS hash for address: ${this.bchAddr}...`)

      const txs = await this.bchMessage.memo.memoRead(
        this.bchAddr,
        'IPFS UPDATE'
      )
      console.log(`txs: ${JSON.stringify(txs, null, 2)}`)

      // If the array is empty, then return false.
      if (txs.length === 0) return false

      const hash = txs[0].subject

      console.log(`...found this IPFS hash: ${hash}`)

      // The transactions should automatically be sorted by the bchMessage
      // library. So Just return the subject.
      return hash
    } catch (err) {
      console.warn(`Could not find IPFS hash in transaction history.`)
      return false
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default Memo
