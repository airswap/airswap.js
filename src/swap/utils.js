const _ = require('lodash')

function flatten(nestedSwap) {
  const toReturn = {}

  _.each(_.keys(nestedSwap), i => {
    if (typeof nestedSwap[i] === 'object') {
      const flatObject = flatten(nestedSwap[i])
      _.each(_.keys(flatObject), x => {
        toReturn[i + _.upperFirst(x)] = flatObject[x]
      })
    } else {
      toReturn[i] = nestedSwap[i]
    }
  })
  return toReturn
}

function recurseNest(keyArray, endVal) {
  const [key, ...rest] = keyArray
  if (rest.length === 0) {
    return {
      [key]: endVal,
    }
  }
  return {
    [key]: recurseNest(rest, endVal),
  }
}

function nest(flattenedSwap) {
  return _.reduce(
    flattenedSwap,
    (result, value, key) => {
      const keyArray = _.kebabCase(key).split('-')
      const nested = recurseNest(keyArray, value)
      return _.merge({}, result, nested)
    },
    {},
  )
}

function getSwapOrderId(orderParams) {
  if (!_.isObject(orderParams)) {
    return false
  }

  const order = orderParams.maker ? orderParams : nest(orderParams)

  const {
    maker: { wallet },
    nonce,
  } = order
  return `${wallet}${nonce}`
}

function mapNested22OrderTo20Order(order) {
  const { nonce, expiry, signer, maker, sender, taker, affiliate, signature, ...rest } = order
  return {
    ...rest,
    nonce,
    expiry,
    maker: signer || maker,
    taker: sender || taker,
    affiliate,
    signature,
  }
}

function mapNested20OrderTo22Order(order) {
  const { nonce, expiry, maker, signer, taker, sender, affiliate, signature, ...rest } = order
  return {
    ...rest,
    nonce,
    expiry,
    signer: maker || signer,
    sender: taker || sender,
    affiliate,
    signature,
  }
}

function mapFlat20OrderTo22Order(order) {
  const {
    nonce,
    expiry,
    signerWallet,
    signerToken,
    signerParam,
    signerKind,
    makerWallet,
    makerToken,
    makerParam,
    makerKind,
    senderWallet,
    senderToken,
    senderParam,
    senderKind,
    takerWallet,
    takerToken,
    takerParam,
    takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateParam,
    affiliateKind,
    signatureSigner,
    signatureVersion,
    signatureR,
    signatureS,
    signatureV,
    ...rest
  } = order
  return {
    ...rest,
    nonce,
    expiry,
    signerWallet: makerWallet || signerWallet,
    signerToken: makerToken || signerToken,
    signerParam: makerParam || signerParam,
    signerKind: makerKind || signerKind,
    senderWallet: takerWallet || senderWallet,
    senderToken: takerToken || senderToken,
    senderParam: takerParam || senderParam,
    senderKind: takerKind || senderKind,
    affiliateWallet,
    affiliateToken,
    affiliateParam,
    affiliateKind,
    signatureSigner,
    signatureVersion,
    signatureR,
    signatureS,
    signatureV,
    ...rest,
  }
}

function mapFlat22OrderTo20Order(order) {
  const {
    nonce,
    expiry,
    signerWallet,
    signerToken,
    signerParam,
    signerKind,
    makerWallet,
    makerToken,
    makerParam,
    makerKind,
    senderWallet,
    senderToken,
    senderParam,
    senderKind,
    takerWallet,
    takerToken,
    takerParam,
    takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateParam,
    affiliateKind,
    signatureSigner,
    signatureVersion,
    signatureR,
    signatureS,
    signatureV,
    ...rest
  } = order
  return {
    ...rest,
    nonce,
    expiry,
    makerWallet: signerWallet || makerWallet,
    makerToken: signerToken || makerToken,
    makerParam: signerParam || makerParam,
    makerKind: signerKind || makerKind,
    takerWallet: senderWallet || takerWallet,
    takerToken: senderToken || takerToken,
    takerParam: senderParam || takerParam,
    takerKind: senderKind || takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateParam,
    affiliateKind,
    signatureSigner,
    signatureVersion,
    signatureR,
    signatureS,
    signatureV,
    ...rest,
  }
}

function mapNested22QuoteTo20Quote(quote) {
  const { swap, signer, sender, ...rest } = quote
  return {
    ...rest,
    maker: signer,
    taker: sender,
    swap,
  }
}

function mapNested20QuoteTo22Quote(quote) {
  const { swap, maker, taker, ...rest } = quote
  return {
    ...rest,
    signer: maker,
    sender: taker,
    swap,
  }
}

module.exports = {
  flatten,
  nest,
  getSwapOrderId,
  mapNested22OrderTo20Order,
  mapNested20OrderTo22Order,
  mapNested22QuoteTo20Quote,
  mapNested20QuoteTo22Quote,
  mapFlat20OrderTo22Order,
  mapFlat22OrderTo20Order,
}
