const fs = require('fs')
const _ = require('lodash')
const indexer = require('./indexer')
const wrapper = require('./wrapper')
const swap = require('./swap')
const delegateFactory = require('./delegateFactory')
require('./delegate') // delegate doesn't have a deployed contract addres, so no return valu
require('./indexContract')

const combined = _.mapValues(
  {
    indexer,
    swap,
    wrapper,
    delegateFactory,
  },
  val => _.mapValues(val, address => address.toLowerCase()),
)

fs.writeFileSync(`contractConstants.json`, JSON.stringify(combined, null, 2))
