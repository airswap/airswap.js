const _ = require('lodash')
const ethers = require('ethers')

function mapOnChainIntentToOffChain({ senderToken, signerToken, identifier, locator }) {
  return {
    address: identifier,
    makerAddress: identifier,
    makerToken: signerToken,
    takerToken: senderToken,
    locator,
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

function parseLocatorAndLocatorType(bytes32Locator) {
  let locator
  let locatorType
  try {
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
  } catch (e) {
    locator = _.trimEnd(bytes32Locator, '0')
    locatorType = 'contract'
  }
  return { locator, locatorType }
}

module.exports = { mapOnChainIntentToOffChain, parseLocatorAndLocatorType }
