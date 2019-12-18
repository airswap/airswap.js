const _ = require('lodash')

const INDEX_TYPES = {
  '0x0000': 'https',
  '0x0001': 'contract',
}

const INDEX_TYPES_LOOKUP = _.invert(INDEX_TYPES)

module.exports = {
  INDEX_TYPES,
  INDEX_TYPES_LOOKUP,
}
