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
  let order = orderParams

  if (order.makerToken || order.signerToken || order.makerWallet || order.signerWallet) {
    // order is flat
    order = nest(order)
  }
  // now order is nested
  if (order.signer && order.signer.wallet) {
    // order is 2.2
    order = mapNested22OrderTo20Order(order)
  }

  // now order is nested 2.2
  const {
    maker: { wallet },
    nonce,
  } = order
  return `${wallet}${nonce}`
}

function mapParty(party, filter = false) {
  const { wallet, kind, amount, token, id } = party
  return filter ? { wallet, kind, amount, token, id } : party
}

function mapNested22OrderTo20Order(order, filter = false) {
  const { nonce, expiry, signer, maker, sender, taker, affiliate, signature, ...rest } = order
  return {
    ...(filter ? {} : rest),
    nonce,
    expiry,
    maker: mapParty(signer || maker || {}, filter),
    taker: mapParty(sender || taker || {}, filter),
    affiliate,
    signature,
  }
}

function mapNested20OrderTo22Order(order, filter = false) {
  const { nonce, expiry, maker, signer, taker, sender, affiliate, signature, ...rest } = order
  return {
    ...(filter ? {} : rest),
    nonce,
    expiry,
    signer: mapParty(maker || signer || {}, filter),
    sender: mapParty(taker || sender || {}, filter),
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
    signerAmount,
    signerId,
    signerKind,
    makerWallet,
    makerToken,
    makerAmount,
    makerId,
    makerKind,
    senderWallet,
    senderToken,
    senderAmount,
    senderId,
    senderKind,
    takerWallet,
    takerToken,
    takerAmount,
    takerId,
    takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
    affiliateId,
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
    signerAmount: makerAmount || signerAmount,
    signerId: makerId || signerId,
    signerKind: makerKind || signerKind,
    senderWallet: takerWallet || senderWallet,
    senderToken: takerToken || senderToken,
    senderAmount: takerAmount || senderAmount,
    senderId: takerId || senderId,
    senderKind: takerKind || senderKind,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
    affiliateId,
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
    signerAmount,
    signerId,
    signerKind,
    makerWallet,
    makerToken,
    makerAmount,
    makerId,
    makerKind,
    senderWallet,
    senderToken,
    senderAmount,
    senderId,
    senderKind,
    takerWallet,
    takerToken,
    takerAmount,
    takerId,
    takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
    affiliateId,
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
    makerAmount: signerAmount || makerAmount,
    makerId: signerId || makerId,
    makerKind: signerKind || makerKind,
    takerWallet: senderWallet || takerWallet,
    takerToken: senderToken || takerToken,
    takerAmount: senderAmount || takerAmount,
    takerId: senderId || takerId,
    takerKind: senderKind || takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
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
