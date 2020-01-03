const _ = require('lodash')
const { trackIndexSetLocator, trackIndexUnsetLocator } = require('../index/eventListeners')
const { trackIndexerCreateIndex } = require('./eventListeners')
const { parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents, mapOnChainIntentToOffChain } = require('./utils')
const { INDEXER_CONTRACT_DEPLOY_BLOCK } = require('../constants')

class Indexer {
  constructor({ onIndexAdded, onLocatorAdded, onLocatorUnset } = {}) {
    this.indexEvents = []
    this.indexes = []
    this.locatorEvents = []
    this.locators = []
    this.unsetLocatorEvents = []
    this.unsetLocators = []

    this.onIndexAdded = onIndexAdded || _.identity
    this.onLocatorAdded = onLocatorAdded || _.identity
    this.onLocatorUnset = onLocatorUnset || _.identity
    const initialIndexLoad = new Promise(resolve =>
      trackIndexerCreateIndex({
        callback: async events => {
          this.indexEvents = [...this.indexEvents, ...events]
          this.addIndexesFromEvents(events)
        },
        onFetchedHistoricalEvents: events => resolve(events),
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
      }),
    )
    const initialLocatorLoad = new Promise(resolve =>
      trackIndexSetLocator({
        callback: async events => {
          this.locatorEvents = [...this.locatorEvents, ...events]
          this.addLocatorFromEvents(events)
        },
        fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
        onFetchedHistoricalEvents: events => resolve(events),
      }),
    )

    const initialUnsetLocatorLoad = new Promise(resolve =>
      trackIndexUnsetLocator({
        callback: async events => {
          this.unsetLocatorEvents = [...this.unsetLocatorEvents, ...events]
          this.addUnsetLocatorFromEvents(events)
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
    const locators = events.map(({ values, address, blockNumber, logIndex }) => {
      const indexAddress = address.toLowerCase()
      return {
        ...values,
        indexAddress,
        blockNumber,
        logIndex,
      }
    })
    locators.forEach(locator => {
      this.onLocatorAdded(locator)
    })

    this.locators = [...this.locators, ...locators]
  }
  async addUnsetLocatorFromEvents(events) {
    const unsetLocators = events.map(({ values, address, blockNumber, logIndex }) => {
      const indexAddress = address.toLowerCase()
      return {
        ...values,
        indexAddress,
        blockNumber,
        logIndex,
      }
    })
    unsetLocators.forEach(locator => {
      this.onLocatorUnset(locator)
    })

    this.unsetLocators = [...this.unsetLocators, ...unsetLocators]
  }
  getIntents() {
    const locators = getUniqueLocatorsFromBlockEvents(this.locatorEvents, this.unsetLocatorEvents)

    return locators
      .map(locator => {
        const { signerToken, senderToken, protocol } =
          this.indexes.find(({ indexAddress }) => indexAddress === locator.indexAddress) || {}
        parseLocatorAndLocatorType(locator.locator, locator.identifier)
        return {
          signerToken,
          senderToken,
          protocol,
          identifier: locator.identifier,
          ...parseLocatorAndLocatorType(locator.locator, locator.identifier, protocol),
          swapVersion: 2,
        }
      })
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
