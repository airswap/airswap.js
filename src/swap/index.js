const ethers = require('ethers')
const Web3 = require('web3')
const { hashes, constants } = require('@airswap/order-utils')
const ethUtil = require('ethereumjs-util')
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

async function signSwap(order, signer) {
  const orderHashHex = hashes.getOrderHash(order) // See: @airswap/order-utils/src/hashes.js:60
  const signedMsg = await signer.signMessage(ethers.utils.arrayify(orderHashHex))
  const sig = ethers.utils.splitSignature(signedMsg)

  const { r, s, v } = sig
  return {
    ...order,
    version: '0x45', // Version 0x45: personal_sign
    r,
    s,
    v,
  }
}

async function signSwapTypedData(order, signer) {
  const DOMAIN_NAME = 'SWAP'
  const DOMAIN_VERSION = '2'
  const verifyingContract = SWAP_CONTRACT_ADDRESS
  const data = {
    types: constants.types, // See: @airswap/order-utils/src/constants.js:4
    domain: {
      name: DOMAIN_NAME,
      version: DOMAIN_VERSION,
      verifyingContract,
    },
    primaryType: 'Order',
    message: order, // See: @airswap/order-utils/src/orders.js:28
  }

  const sig = signer.signTypedData(data)
  const { r, s, v } = ethUtil.fromRpcSig(sig)
  return {
    ...order,
    version: '0x01', // Version 0x01: signTypedData
    r,
    s,
    v,
  }
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

module.exports = { swap, swapSimple, cancel, signSwapSimple, signSwapTypedData, signSwap }
