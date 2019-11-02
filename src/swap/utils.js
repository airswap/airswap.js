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
  const { nonce, expiry, signer, maker, sender, taker, affiliate, signature } = order
  return {
    nonce,
    expiry,
    maker: signer || maker,
    taker: sender || taker,
    affiliate,
    signature,
  }
}

function mapNested20OrderTo22Order(order) {
  const { nonce, expiry, maker, signer, taker, sender, affiliate, signature } = order
  return {
    nonce,
    expiry,
    signer: maker || signer,
    sender: taker || sender,
    affiliate,
    signature,
  }
}

function mapNested22QuoteTo20Quote(quote) {
  const { swap, signer, sender } = quote
  return {
    maker: signer,
    taker: sender,
    swap,
  }
}

function mapNested20QuoteTo22Quote(quote) {
  const { swap, maker, taker } = quote
  return {
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
}
