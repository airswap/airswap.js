const _ = require('lodash')
const { constants } = require('@airswap/order-utils')
const {
  getDelegateGetMaxQuote,
  getDelegateGetSenderSideQuote,
  getDelegateGetSignerSideQuote,
} = require('./contractFunctions')

const { nest } = require('../swap/utils')

const { ERC20_INTERFACE_ID } = constants

const resolveBigNumbers = require('../utils/resolveBigNumbers')

function format(resp) {
  return nest(
    reverseObjectMethods({
      ...resp,
      senderKind: ERC20_INTERFACE_ID,
      signerKind: ERC20_INTERFACE_ID,
      senderId: '0',
      signerId: '0',
    }),
  )
}

function toggleMethod(str) {
  if (str.includes('Signer')) {
    return str.replace('Signer', 'Sender')
  } else if (str.includes('Sender')) {
    return str.replace('Sender', 'Signer')
  } else if (str.includes('signer')) {
    return str.replace('signer', 'sender')
  } else if (str.includes('sender')) {
    return str.replace('sender', 'signer')
  } else if (str.includes('Maker')) {
    return str.replace('Maker', 'Taker')
  } else if (str.includes('Taker')) {
    return str.replace('Taker', 'Maker')
  } else if (str.includes('maker')) {
    return str.replace('maker', 'taker')
  } else if (str.includes('taker')) {
    return str.replace('taker', 'maker')
  }
  return str
}

function reverseObjectMethods(params) {
  return _.mapKeys(params, (p, k) => toggleMethod(k))
}

function reverseParams({ method, params }) {
  return {
    method: toggleMethod(method),
    params: reverseObjectMethods(params),
  }
}

async function routeDelegateCall(receiver, request, tradeWallet, signerWallet) {
  const {
    method,
    params: { signerToken, senderToken, signerAmount, senderAmount },
  } = reverseParams(request)

  switch (method) {
    case 'getSignerSideQuote':
      return getDelegateGetSignerSideQuote(receiver, senderAmount, senderToken, signerToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerAmount: resolveBigNumbers(resp),
          senderAmount,
        }),
      )
    case 'getSenderSideQuote':
      return getDelegateGetSenderSideQuote(receiver, signerAmount, signerToken, senderToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerAmount,
          senderAmount: resolveBigNumbers(resp),
        }),
      )
    case 'getSignerSideOrder':
      return getDelegateGetSignerSideQuote(receiver, senderAmount, senderToken, signerToken).then(resp =>
        format({
          senderWallet: tradeWallet,
          signerWallet,
          signerToken,
          senderToken,
          signerAmount: resolveBigNumbers(resp),
          senderAmount,
          nonce: `${Date.now()}`,
        }),
      )
    case 'getSenderSideOrder':
      return getDelegateGetSenderSideQuote(receiver, signerAmount, signerToken, senderToken).then(resp =>
        format({
          senderWallet: tradeWallet,
          signerWallet,
          signerToken,
          senderToken,
          signerAmount,
          senderAmount: resolveBigNumbers(resp),
          nonce: `${Date.now()}`,
        }),
      )
    case 'getMaxQuote':
      return getDelegateGetMaxQuote(receiver, senderToken, signerToken).then(resp => {
        const formattedResp = resolveBigNumbers(resp)

        return format({
          signerToken,
          senderToken,
          senderAmount: formattedResp.senderAmount,
          signerAmount: formattedResp.signerAmount,
        })
      })
    default:
      throw new Error(`invalid delegate method name ${method}`)
  }
}

module.exports = { routeDelegateCall, reverseObjectMethods }
