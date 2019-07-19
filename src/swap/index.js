const ethers = require('ethers')
const Web3 = require('web3')
const { SWAP_CONTRACT_ADDRESS, ETH_ADDRESS, abis } = require('../constants')

const web3 = new Web3()

window.bignumberify = ethers.utils.bigNumberify

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer)
}

function swap(order, signature, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order, signature, {
    value: ethers.utils.bigNumberify(order.taker.token === ETH_ADDRESS ? order.taker.param : 0),
  })
}

function swapSimple(order, signer) {
  const contract = getSwapContract(signer)

  return contract.swapSimple(
    order.nonce,
    order.expiry,
    order.makerWallet,
    order.makerParam,
    order.makerToken,
    order.takerWallet,
    order.takerParam,
    order.takerToken,
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

async function signSwapSimple(order, signer) {
  const { nonce, makerWallet, makerParam, makerToken, takerWallet, takerParam, takerToken, expiry } = order

  const hashedOrder = web3.utils.soliditySha3(
    // Version 0x00: Data with intended validator (verifyingContract)
    { type: 'bytes1', value: '0x0' },
    { type: 'address', value: SWAP_CONTRACT_ADDRESS },
    { type: 'uint256', value: nonce },
    { type: 'uint256', value: expiry },
    { type: 'address', value: makerWallet },
    { type: 'uint256', value: makerParam },
    { type: 'address', value: makerToken },
    { type: 'address', value: takerWallet },
    { type: 'uint256', value: takerParam },
    { type: 'address', value: takerToken },
  )

  const signedMsg = await signer.signMessage(ethers.utils.arrayify(hashedOrder))

  const sig = ethers.utils.splitSignature(signedMsg)

  return {
    nonce,
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

module.exports = { swap, swapSimple, cancel, signSwapSimple }
