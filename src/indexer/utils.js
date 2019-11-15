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

export { mapOnChainIntentToOffChain }
