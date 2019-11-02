const _ = require('lodash')
const ethers = require('ethers')
const {
  hashes: { getOrderHash },
  constants,
} = require('@airswap/order-utils')
const { nest, mapNested20OrderTo22Order } = require('./utils')
const { SWAP_CONTRACT_ADDRESS, abis } = require('../constants')

const removeFalsey = obj => _.pickBy(obj, _.identity)

const fillOrderDefaults = ({ expiry, nonce, signer, sender, affiliate }) => ({
  expiry: `${expiry}`,
  nonce: `${nonce}`,
  signer: { ...constants.defaults.Party, ...removeFalsey(signer) },
  sender: { ...constants.defaults.Party, ...removeFalsey(sender) },
  affiliate: { ...constants.defaults.Party, ...removeFalsey(affiliate) },
})

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer)
}

async function swap(orderParams, signer) {
  let order = orderParams
  if (order.makerToken || order.signerToken) {
    // order is flat
    order = nest(order)
  }
  // now order is nested
  if (order.maker) {
    // order is in 2.0 format and we need to map to 2.2 format
    order = mapNested20OrderTo22Order(order)
  }

  // now order is in nested 2.2 format
  order.signature.v = Number(order.signature.v)

  const contract = getSwapContract(signer)
  return contract.swap(order)
}

async function signSwap(orderParams, signer) {
  // TODO: Add automatic ERC20 vs ERC721 type detection
  const order = fillOrderDefaults(mapNested20OrderTo22Order(orderParams))
  const orderHashHex = getOrderHash(order, SWAP_CONTRACT_ADDRESS)
  const signedMsg = await signer.signMessage(ethers.utils.arrayify(orderHashHex))
  const sig = ethers.utils.splitSignature(signedMsg)
  const signerAddress = await signer.getAddress()
  const { r, s, v } = sig
  const signedOrder = {
    ...order,
    signature: {
      signatory: signerAddress.toLowerCase(), // Version 0x45: personal_sign
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
      signatory: signerAddress.toLowerCase(),
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
