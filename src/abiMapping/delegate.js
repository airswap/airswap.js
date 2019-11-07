const _ = require('lodash')
const fs = require('fs')
const { abi } = require('@airswap/delegate/build/contracts/Delegate')

const overwrites = [
  {
    inputs: [
      {
        name: 'senderToken',
      },
      {
        name: 'signerToken',
      },
    ],
    name: 'rules',
  },
]

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

fs.writeFileSync(`abis/delegate.json`, JSON.stringify(newAbi, null, 2))

module.exports = {}
