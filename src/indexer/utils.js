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
  } else if (!locatorType) {
    return {}
  }

  return { locator, locatorType }
}

function getUniqueLocatorsFromBlockEvents(parsedEvents) {
  return _.reduce(
    _.compact(parsedEvents),
    (agg, val) => {
      const existingLocator = _.find(agg, { indexAddress: val.indexAddress, identifier: val.identifier })
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
}

module.exports = { mapOnChainIntentToOffChain, parseLocatorAndLocatorType, getUniqueLocatorsFromBlockEvents }
