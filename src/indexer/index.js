const _ = require('lodash')
const { trackIndexSetLocator, trackIndexUnsetLocator } = require('../index/eventListeners')
const { trackIndexerCreateIndex } = require('./eventListeners')
const { parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents, mapOnChainIntentToOffChain } = require('./utils')
const { INDEXER_CONTRACT_DEPLOY_BLOCK } = require('../constants')

class Indexer {
  constructor({ onIndexAdded, onLocatorAdded } = {}) {
    this.indexEvents = []
    this.indexes = []
    this.locatorEvents = []
    this.locators = []
    this.unsetLocatorEvents = []
    this.unsetLocators = []

    this.onIndexAdded = onIndexAdded || _.identity
    this.onLocatorAdded = onLocatorAdded || _.identity
    const initialIndexLoad = new Promise(resolve =>
      trackIndexerCreateIndex({
        callback: async events => {
          this.indexEvents.push(events)
          this.addIndexesFromEvents(events)
        },
        onFetchedHistoricalEvents: events => resolve(events),
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      }),
    )
    const initialLocatorLoad = new Promise(resolve =>
      trackIndexSetLocator({
        callback: async events => {
          this.locatorEvents.push(events)
          this.addLocatorFromEvents(events)
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
        onFetchedHistoricalEvents: events => resolve(events),
      }),
    )

    const initialUnsetLocatorLoad = new Promise(resolve =>
      trackIndexUnsetLocator({
        callback: async events => {
          this.unsetLocatorEvents.push(events)
          // this.addUnsetLocatorFromEvents(events)
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
        onFetchedHistoricalEvents: events => resolve(events),
      }),
    )

    this.ready = Promise.all([initialIndexLoad, initialLocatorLoad, initialUnsetLocatorLoad])
  }
  async addIndexesFromEvents(events) {
    const indexes = events.map(({ values }) => values)

    indexes.forEach(index => {
      this.onIndexAdded(index)
    })
    this.indexes = [...this.indexes, ...indexes]
  }
  async addLocatorFromEvents(events) {
    const locators = events.map(({ values, address, blockNumber }) => {
      const indexAddress = address.toLowerCase()
      return {
        ...values,
        ...parseLocatorAndLocatorType(values.locator, values.identifier),
        indexAddress,
        blockNumber,
      }
    })
    locators.forEach(locator => {
      this.onLocatorAdded(locator)
    })

    const combinedLocators = [...this.locators, ...locators]
    const uniqueLocators = getUniqueLocatorsFromBlockEvents(combinedLocators)

    this.locators = _.sortBy(uniqueLocators, 'score').reverse()
  }
  // eslint-disable-next-line
  // async addUnsetLocatorFromEvents(events) {
  //   // TODO: use unset locator events to remove active locators from the locator list
  // }
  getIntents() {
    return this.locators
      .map(locator => ({
        ...locator,
        ...(this.indexes.find(({ indexAddress }) => indexAddress === locator.indexAddress) || {}),
        swapVersion: 2, // version number is used in downstream dependencies like the protocolMessaging Router
      }))
      .filter(
        ({ identifier, locator, locatorType, senderToken, signerToken }) =>
          identifier && locator && locatorType && senderToken && signerToken,
      )
  }
  getLegacyFormattedIntents() {
    return this.getIntents().map(intent => mapOnChainIntentToOffChain(intent))
  }
}

module.exports = Indexer
