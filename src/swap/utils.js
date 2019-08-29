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

module.exports = { flatten, nest, getSwapOrderId }
