const fs = require('fs')
const _ = require('lodash')
const indexer = require('./indexer')
const wrapper = require('./wrapper')

const swap = require('./swap')

const combined = _.mapValues(
  {
    indexer,
    swap,
    wrapper,
  },
  val => _.mapValues(val, address => address.toLowerCase()),
)

fs.writeFileSync(`contractConstants.json`, JSON.stringify(combined, null, 2))
