const _ = require('lodash')
const ethers = require('ethers')

function mapOnChainIntentToOffChain({ senderToken, signerToken, identifier, locator, locatorType }) {
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

module.exports = { mapOnChainIntentToOffChain, parseLocatorAndLocatorType }
