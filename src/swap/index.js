const _ = require('lodash')
const ethers = require('ethers')
const {
  hashes: { getOrderHash },
  constants,
} = require('@airswap/order-utils')
const { nest } = require('./utils')
const { SWAP_CONTRACT_ADDRESS, abis } = require('../constants')

const removeFalsey = obj => _.pickBy(obj, _.identity)

const fillOrderDefaults = ({ expiry, nonce, maker, taker, affiliate }) => ({
  expiry: `${expiry}`,
  nonce: `${nonce}`,
  maker: { ...constants.defaults.Party, ...removeFalsey(maker) },
  taker: { ...constants.defaults.Party, ...removeFalsey(taker) },
  affiliate: { ...constants.defaults.Party, ...removeFalsey(affiliate) },
})

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer)
}

async function swap(orderParams, signer) {
  const order = orderParams.maker ? orderParams : nest(orderParams)
  order.signature.v = Number(order.signature.v)
  const contract = getSwapContract(signer)
  return contract.swap(order)
}

async function signSwap(orderParams, signer) {
  // TODO: Add automatic ERC20 vs ERC721 type detection
  const order = fillOrderDefaults(orderParams)
  const orderHashHex = getOrderHash(order, SWAP_CONTRACT_ADDRESS)
  const signedMsg = await signer.signMessage(ethers.utils.arrayify(orderHashHex))
  const sig = ethers.utils.splitSignature(signedMsg)
  const signerAddress = await signer.getAddress()
  const { r, s, v } = sig
  const signedOrder = {
    ...order,
    signature: {
      signer: signerAddress.toLowerCase(), // Version 0x45: personal_sign
      version: constants.signatures.PERSONAL_SIGN,
      r,
      s,
      v: `${v}`,
    },
  }

  return signedOrder
}

async function signSwapTypedData(orderParams, signer) {
  const order = fillOrderDefaults(orderParams)
  const data = {
    types: constants.types, // See: @airswap/order-utils/src/constants.js:4
    domain: {
      name: constants.DOMAIN_NAME,
      version: constants.DOMAIN_VERSION,
      verifyingContract: SWAP_CONTRACT_ADDRESS,
    },
    primaryType: 'Order',
    message: order, // remove falsey values on order
  }
  const signerAddress = await signer.getAddress()
  const sig = await signer.signTypedData(data)
  const { r, s, v } = ethers.utils.splitSignature(sig)
  const signedOrder = {
    ...order,
    signature: {
      signer: signerAddress.toLowerCase(),
      version: constants.signatures.SIGN_TYPED_DATA, // Version 0x01: signTypedData
      r,
      s,
      v: `${v}`,
    },
  }
  return signedOrder
}

function cancel(ids, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(ids)
}

function getMakerOrderStatus(makerAddress, nonce, signer) {
  const contract = getSwapContract(signer)

  return contract.makerOrderStatus(makerAddress, nonce)
}

module.exports = { swap, cancel, signSwapTypedData, signSwap, getMakerOrderStatus }
