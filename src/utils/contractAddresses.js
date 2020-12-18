// node version: v9.10.0
// module versions:
// rlp@2.0.0
// keccak@1.4.0
const ethers = require('ethers')
const rlp = require('rlp')
const keccak = require('keccak')
const _ = require('lodash')
const { ethersProvider } = require('../constants')

async function findDeployedContractsForSender(sender, bytecode) {
  const transactionCount = await ethersProvider.getTransactionCount(sender)
  const nonces = _.range(0, transactionCount)
  const contracts = []
  // now I iterate over it
  await Promise.all(
    _.map(nonces, async intNonce => {
      const nonce = parseInt(ethers.utils.hexlify(intNonce), 16)
      const input_arr = [sender, nonce]
      const rlp_encoded = rlp.encode(input_arr)

      const contract_address_long = keccak('keccak256')
        .update(rlp_encoded)
        .digest('hex')

      const contract_address = `0x${contract_address_long.substring(24)}` // Trim the first 24 characters.
      const code = await ethersProvider.getCode(contract_address)
      if (code.replace(/^\s+|\s+$/g, '') === bytecode) {
        contracts.push({ intNonce, address: contract_address })
      }
      return code
    }),
  )
  return _.map(_.sortBy(contracts, 'intNonce'), 'address')
}

module.exports = { findDeployedContractsForSender }
