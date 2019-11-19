const _ = require('lodash')

function resolveBN(input) {
  const str = input._ethersType === 'BigNumber' ? input.toString() : input
  return str.toLowerCase ? str.toLowerCase() : str
}

module.exports = function(input) {
  if (!input) {
    return input
  }
  if (_.isObject(input)) {
    return _.mapValues(input, resolveBN)
  }
  return resolveBN(input)
}
