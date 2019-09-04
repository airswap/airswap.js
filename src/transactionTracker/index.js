const _ = require('lodash')
// const blockTracker = require('../blockTracker')

class TransactionTracker {
  constructor() {
    this.trackedTransactions = []
  }
  async trackTransaction({ transaction }) {
    if (!_.find(this.trackedTransactions, { transactionHash: transaction.hash })) {
      this.trackedTransactions.push({
        transactionHash: transaction.hash,
        transaction,
        mining: true,
        mined: false,
      })
    }
  }
}

module.exports = new TransactionTracker()
