const _ = require('lodash')
const ethers = require('ethers')
const { INDEX_TYPES } = require('./constants')

function mapOnChainIntentToOffChain({ senderToken, signerToken, identifier, tradeWallet, locator, locatorType }) {
  if (locatorType === 'contract') {
    return {
      address: tradeWallet || identifier,
      makerAddress: tradeWallet || identifier,
      makerToken: senderToken, // we reverse signerToken and senderToken for delegates since the connected wallet is the signer instead of the sender
      takerToken: signerToken,
      locator,
      locatorType,
      supportedMethods: [
        'getSignerSideOrder',
        'getSenderSideOrder',
        'getSignerSideQuote',
        'getSenderSideQuote',
        'getMaxQuote',
      ],
      swapVersion: 2,
    }
  }
  return {
    address: identifier,
    makerAddress: identifier,
    makerToken: signerToken,
    takerToken: senderToken,
    locator,
    locatorType,
    supportedMethods: [
      'getSignerSideOrder',
      'getSenderSideOrder',
      'getSignerSideQuote',
      'getSenderSideQuote',
      'getMaxQuote',
    ],
    swapVersion: 2,
  }
}

function parseLocatorAndLocatorType(bytes32Locator, identifier, protocol) {
  let locator
  const locatorType = INDEX_TYPES[protocol]

  if (locatorType === 'contract') {
    locator = identifier.toLowerCase()
  } else if (locatorType === 'https') {
    locator = ethers.utils.parseBytes32String(bytes32Locator)
    if (!_.startsWith(locator, 'https://')) {
      locator = `https://${locator}`
    }
  } else if (!locatorType) {
    return {}
  }

  return { locator, locatorType }
}

function getUniqueLocatorsFromBlockEvents(locatorEvents, unsetLocatorEvents) {
  const locators = locatorEvents.map(({ values, address, blockNumber, logIndex }) => {
    const indexAddress = address.toLowerCase()
    return {
      ...values,
      indexAddress,
      blockNumber,
      logIndex,
    }
  })

  const unsetLocators = unsetLocatorEvents.map(({ values, address, blockNumber, logIndex }) => {
    const indexAddress = address.toLowerCase()
    return {
      ...values,
      indexAddress,
      blockNumber,
      logIndex,
    }
  })

  const sortedUnsetLocators = _.sortBy(unsetLocators, 'blockNumber').reverse()

  const uniqueLocators = _.reduce(
    _.compact(locators),
    (agg, val) => {
      const existingLocator = _.find(agg, { indexAddress: val.indexAddress, identifier: val.identifier })
      const existingUnsetLocator = _.find(sortedUnsetLocators, {
        indexAddress: val.indexAddress,
        identifier: val.identifier,
      })
      if (existingUnsetLocator && existingUnsetLocator.blockNumber > val.blockNumber) {
        return agg
      }
      if (!existingLocator) {
        return [...agg, val]
      } else if (existingLocator.blockNumber < val.blockNumber) {
        const existingLocatorIndex = _.findIndex(agg, { indexAddress: val.indexAddress, identifier: val.identifier })
        return [...agg.slice(0, existingLocatorIndex), val, ...agg.slice(existingLocatorIndex + 1)]
      }
      return agg
    },
    [],
  )
  return _.sortBy(uniqueLocators, 'score').reverse()
}

module.exports = { mapOnChainIntentToOffChain, parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents }
