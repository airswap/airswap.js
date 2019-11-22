const _ = require('lodash')
const { getIndexerIndexes } = require('./contractFunctions')
const { trackIndexSetLocator } = require('../index/eventListeners')
const { trackIndexerCreateIndex } = require('./eventListeners')
const { parseLocatorAndLocatorType } = require('./utils')
const { INDEXER_CONTRACT_DEPLOY_BLOCK } = require('../constants')

class Indexer {
  constructor({ onIndexAdded, onLocatorAdded, cursorLimit, onReadyForQuery } = {}) {
    this.cursorLimit = cursorLimit || 100
    this.indexes = []
    this.locators = []
    this.onIndexAdded = onIndexAdded || _.identity
    this.onLocatorAdded = onLocatorAdded || _.identity
    this.onReadyForQuery = onReadyForQuery || _.identity
    trackIndexerCreateIndex({
      callback: events => this.addIndexesFromEvents(events),
      fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      onFetchedHistoricalEvents: events => this.addIndexesFromEvents(events, true),
    })
    trackIndexSetLocator({
      callback: events => this.addLocatorFromEvents(events),
      fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      onFetchedHistoricalEvents: events => this.addLocatorFromEvents(events, true),
    })
  }
  async addIndexesFromEvents(events, initialLoad) {
    const indexes = events.map(({ values }) => values)
    const indexAddresses = await Promise.all(
      indexes.map(index =>
        getIndexerIndexes(index.signerToken, index.senderToken).then(address => address.toLowerCase()),
      ),
    )
    this.indexMapping = _.zipObject(indexes, indexAddresses)
    indexes.forEach(index => {
      this.onIndexAdded(index, initialLoad)
      // this.getLocatorsForIndex(index, initialLoad)
    })
    this.indexes = [...this.indexes, ...indexes]
  }
  addLocatorFromEvents(events, initialLoad) {
    const locators = events.map(({ values, address }) => ({
      ...values,
      ...parseLocatorAndLocatorType(values.locator),
      index: address.toLowerCase(),
    }))
    locators.forEach(locator => {
      this.onLocatorAdded(locator)
      // this.getLocatorsForIndex(index, initialLoad)
    })
    this.locators = [...this.locators, ...locators]
    if (initialLoad) {
      this.onReadyForQuery(this.indexes, this.locators)
    }
  }
}
// TODO: remove this after active development is complete
// const i = new Indexer({
//   // onIndexAdded: index => console.log('got index', index),
//   // onLocatorAdded: locator => console.log('got locator', locator),
//   onReadyForQuery: (indexes, locators) => console.log(indexes, locators),
// })

module.exports = Indexer
