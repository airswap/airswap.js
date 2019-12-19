const _ = require('lodash')
const fs = require('fs')
const { abi } = require('@airswap/delegate/build/contracts/DelegateFactory.json')
const constants = require('@airswap/delegate/deploys.json')

const overwrites = []

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

fs.writeFileSync(`abis/delegateFactory.json`, JSON.stringify(newAbi, null, 2))

module.exports = constants
