const ethers = require('ethers')
const { SWAP_CONTRACT_ADDRESS, ETH_ADDRESS, abis } = require('../constants')

window.bignumberify = ethers.utils.bigNumberify

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer)
}

function swap(order, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(
    order.id,
    order.makerWallet,
    order.makerParam,
    order.makerToken,
    order.takerWallet,
    order.takerParam,
    order.takerToken,
    order.expiry,
    order.v,
    order.r,
    order.s,
    {
      value: ethers.utils.bigNumberify(order.takerToken === ETH_ADDRESS ? order.takerParam : 0),
    },
  )
}

function cancel(ids, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(ids)
}

function sign(order, signer) {
  const { id, makerWallet, makerParam, makerToken, takerWallet, takerParam, takerToken, expiry } = order
  const hashedOrder = ethers.utils.solidityKeccak256(
    ['bytes1', 'address', 'uint256', 'address', 'uint256', 'address', 'address', 'uint256', 'address', 'uint256'],
    [
      '0x0',
      SWAP_CONTRACT_ADDRESS,
      id,
      makerWallet,
      makerParam,
      makerToken,
      takerWallet,
      takerParam,
      takerToken,
      expiry,
    ],
  )

  const signedMsg = signer.signMessage(ethers.utils.arrayify(hashedOrder))
  const sig = ethers.utils.splitSignature(signedMsg)

  return {
    id,
    makerWallet,
    makerParam,
    makerToken,
    takerWallet,
    takerParam,
    takerToken,
    expiry,
    ...sig,
  }
}

module.exports = { swap, cancel, sign }
