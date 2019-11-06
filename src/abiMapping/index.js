const fs = require('fs')

const indexer = require('./indexer')
const wrapper = require('./indexer')

const swap = require('./swap')

const combined = {
  indexer,
  swap,
  wrapper,
}

fs.writeFileSync(`contractConstants.json`, JSON.stringify(combined, null, 2))
