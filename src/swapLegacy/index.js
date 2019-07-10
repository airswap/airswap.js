const ethers = require('ethers')
const { SWAP_LEGACY_CONTRACT_ADDRESS, ETH_ADDRESS, abis } = require('../constants')

function getSwapLegacyContract(signer) {
  return new ethers.Contract(SWAP_LEGACY_CONTRACT_ADDRESS, abis[SWAP_LEGACY_CONTRACT_ADDRESS], signer)
}

window.bignumberify = ethers.utils.bigNumberify

function fillOrder(order, signer, params = {}) {
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
      ...params,
    },
  )
}

function cancelOrder(order, signer, params = {}) {
  const contract = getSwapLegacyContract(signer)
  return contract.cancel(
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
      value: 0,
      ...params,
    },
  )
}

async function signOrder(order, signer) {
  const { makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce } = order
  const types = [
    'address', // makerAddress
    'uint256', // makerAmount
    'address', // makerToken
    'address', // takerAddress
    'uint256', // takerAmount
    'address', // takertoken
    'uint256', // expiration
    'uint256', // nonce
  ]
  const hashedOrder = ethers.utils.solidityKeccak256(types, [
    makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
  ])

  const signedMsg = await signer.signMessage(ethers.utils.arrayify(hashedOrder))
  const sig = ethers.utils.splitSignature(signedMsg)

  return {
    makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    ...sig,
  }
}

module.exports = { fillOrder, signOrder, cancelOrder }
