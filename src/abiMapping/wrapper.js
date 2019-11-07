const _ = require('lodash')
const fs = require('fs')
const { abi } = require('@airswap/wrapper/build/contracts/Wrapper.json')
const constants = require('@airswap/wrapper/deploys.json')

const overwrites = []

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

fs.writeFileSync(`abis/wrapper.json`, JSON.stringify(newAbi, null, 2))

module.exports = constants
