const _ = require('lodash')
const abi = require('../abis/Swap')

const overwrites = [
  {
    inputs: [
      {
        name: 'sender',
      },
      {
        name: 'authorizedSender',
      },
    ],
    name: 'senderAuthorizations',
  },
  {
    inputs: [
      {
        name: 'signer',
      },
      {
        name: 'authorizedSigner',
      },
    ],
    name: 'signerAuthorizations',
  },
  {
    inputs: [
      {
        name: 'signer',
      },
    ],
    name: 'signerMinimumNonce',
  },
  {
    inputs: [
      {
        name: 'signer',
      },
      {
        name: 'nonce',
      },
    ],
    name: 'signerNonceStatus',
  },
]

const newAbi = _.map(abi, abiItem => {
  const overwriteItem = _.find(overwrites, o => o.name === abiItem.name)
  const newItem = _.merge(abiItem, overwriteItem)

  return newItem
})

module.exports = newAbi
