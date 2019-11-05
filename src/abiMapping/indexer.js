const _ = require('lodash')
const { abi } = require('@airswap/indexer/build/contracts/Indexer.json')

const overwrites = [
  {
    inputs: [
      {
        name: 'signerToken',
      },
      {
        name: 'senderToken',
      },
    ],
    name: 'indexes',
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

module.exports = newAbi
