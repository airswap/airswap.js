const _ = require('lodash')
const fs = require('fs')
const { abi } = require('@airswap/indexer/build/contracts/Indexer.json')
const constants = require('@airswap/indexer/deploys.json')

const overwrites = [
  {
    inputs: [
      {
        name: 'signerToken',
      },
      {
        name: 'senderToken',
      },
      {
        name: 'protocol',
      },
    ],
    name: 'indexes',
  },
  {
    inputs: [
      {
        name: 'protocol',
      },
    ],
    name: 'locatorWhitelists',
  },
  {
    inputs: [
      {
        name: 'token',
      },
    ],
    name: 'tokenBlacklist',
  },
]

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

fs.writeFileSync(`abis/indexer.json`, JSON.stringify(newAbi, null, 2))

module.exports = constants
