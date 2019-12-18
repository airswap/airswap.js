const _ = require('lodash')
const ethers = require('ethers')

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

const prefixes = ['https', 'http']

function parseLocatorAndLocatorType(bytes32Locator, identifier) {
  let locator
  let locatorType

  if (_.startsWith(bytes32Locator.toLowerCase(), identifier.toLowerCase())) {
    locator = identifier.toLowerCase()
    locatorType = 'contract'
  } else {
    locator = ethers.utils.parseBytes32String(bytes32Locator)

    locatorType = _.reduce(
      prefixes,
      (agg, val) => {
        if (agg) {
          return agg
        }

        if (_.startsWith(locator, val)) {
          return val
        }
      },
      '',
    )
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
