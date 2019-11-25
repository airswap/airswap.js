const _ = require('lodash')
const { getIndexerIndexes } = require('./contractFunctions')
const { trackIndexSetLocator } = require('../index/eventListeners')
const { trackIndexerCreateIndex } = require('./eventListeners')
const { parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents } = require('./utils')
const { INDEXER_CONTRACT_DEPLOY_BLOCK } = require('../constants')

class Indexer {
  constructor({ onIndexAdded, onLocatorAdded } = {}) {
    this.indexes = []
    this.locators = []
    this.indexMapping = {}
    this.onIndexAdded = onIndexAdded || _.identity
    this.onLocatorAdded = onLocatorAdded || _.identity
    const initialIndexLoad = new Promise(resolve =>
      trackIndexerCreateIndex({
        callback: async events => {
          await this.addIndexesFromEvents(events)
          resolve()
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      }),
    )
    const initialLocatorLoad = new Promise(resolve =>
      trackIndexSetLocator({
        callback: async events => {
          this.addLocatorFromEvents(events)
          resolve()
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      }),
    )
    this.ready = Promise.all([initialIndexLoad, initialLocatorLoad])
  }
  async addIndexesFromEvents(events) {
    const indexes = events.map(({ values }) => values)
    const indexAddresses = await Promise.all(
      indexes.map(index =>
        getIndexerIndexes(index.signerToken, index.senderToken).then(address => address.toLowerCase()),
      ),
    )
    this.indexMapping = _.zipObject(indexAddresses, indexes)
    indexes.forEach(index => {
      this.onIndexAdded(index)
    })
    this.indexes = [...this.indexes, ...indexes]
    return this.indexes
  }
  async addLocatorFromEvents(events) {
    const locators = events.map(({ values, address, blockNumber }) => {
      const index = address.toLowerCase()
      return {
        ...values,
        ...parseLocatorAndLocatorType(values.locator, values.identifier),
        index,
        blockNumber,
      }
    })
    locators.forEach(locator => {
      this.onLocatorAdded(locator)
    })

    const combinedLocators = [...this.locators, ...locators]
    const uniqueLocators = getUniqueLocatorsFromBlockEvents(combinedLocators)

    this.locators = _.sortBy(uniqueLocators, 'score').reverse()
    return this.locators
  }
  getIntents() {
    return this.locators.map(locator => ({
      ...locator,
      ...this.indexMapping[locator.index],
    }))
  }
}
// TODO: remove this after active development is complete
// const i = new Indexer()
// i.ready.then(() => console.log(_.filter(i.getIntents(), { locatorType: 'contract' })))

module.exports = Indexer
