const ethUtil = require('ethereumjs-util')
const abi = require('ethereumjs-abi')
const utils = require('web3-utils')
const { Buffer } = require('buffer')

const constants = {
  DOMAIN_NAME: 'SWAP',
  DOMAIN_VERSION: '2',
  SECONDS_IN_DAY: 86400,
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Order: [
      { name: 'nonce', type: 'uint256' },
      { name: 'expiry', type: 'uint256' },
      { name: 'maker', type: 'Party' },
      { name: 'taker', type: 'Party' },
      { name: 'affiliate', type: 'Party' },
    ],
    Party: [
      { name: 'wallet', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'param', type: 'uint256' },
    ],
  },
  defaults: {
    Party: {
      wallet: '0x0000000000000000000000000000000000000000',
      token: '0x0000000000000000000000000000000000000000',
      param: 0,
    },
  },
}

const { DOMAIN_NAME, DOMAIN_VERSION, types } = constants

function stringify(type) {
  let str = `${type}(`
  const keys = Object.keys(types[type])
  for (let i = 0; i < keys.length; i++) {
    str += `${types[type][i].type} ${types[type][i].name}`
    if (i !== keys.length - 1) {
      str += ','
    }
  }
  return `${str})`
}

const EIP712_DOMAIN_TYPEHASH = utils.soliditySha3(stringify('EIP712Domain'))
const ORDER_TYPEHASH = utils.soliditySha3(stringify('Order') + stringify('Party'))
const PARTY_TYPEHASH = utils.soliditySha3(stringify('Party'))

function hashParty(party) {
  return ethUtil.keccak256(
    abi.rawEncode(
      ['bytes32', 'address', 'address', 'uint256'],
      [PARTY_TYPEHASH, party.wallet, party.token, party.param],
    ),
  )
}

function hashOrder(order) {
  return ethUtil.keccak256(
    abi.rawEncode(
      ['uint256', 'uint256', 'uint256', 'bytes32', 'bytes32', 'bytes32'],
      [
        ORDER_TYPEHASH,
        order.nonce,
        order.expiry,
        hashParty(order.maker),
        hashParty(order.taker),
        hashParty(order.affiliate),
      ],
    ),
  )
}

function hashDomain(verifyingContract) {
  return ethUtil.keccak256(
    abi.rawEncode(
      ['bytes32', 'bytes32', 'bytes32', 'address'],
      [EIP712_DOMAIN_TYPEHASH, ethUtil.keccak256(DOMAIN_NAME), ethUtil.keccak256(DOMAIN_VERSION), verifyingContract],
    ),
  )
}

module.exports = {
  getOrderHash(order, verifyingContract) {
    return ethUtil.keccak256(
      Buffer.concat([Buffer.from('1901', 'hex'), hashDomain(verifyingContract), hashOrder(order)]),
    )
  },
  constants,
}
