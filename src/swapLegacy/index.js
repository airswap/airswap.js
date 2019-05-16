const ethers = require('ethers')
const { EXCHANGE_CONTRACT_ADDRESS, ETH_ADDRESS, abis } = require('../constants')

function getSwapLegacyContract(signer) {
  return new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, abis[EXCHANGE_CONTRACT_ADDRESS], signer)
}

window.bignumberify = ethers.utils.bigNumberify

function fillOrder(order, signer) {
  const contract = getSwapLegacyContract(signer)
  return contract.fill(
    order.makerAddress,
    order.makerAmount,
    order.makerToken,
    order.takerAddress,
    order.takerAmount,
    order.takerToken,
    order.expiration,
    order.nonce,
    order.v,
    order.r,
    order.s,
    {
      value: ethers.utils.bigNumberify(order.takerToken === ETH_ADDRESS ? order.takerAmount : 0),
    },
  )
}

module.exports = { fillOrder }
