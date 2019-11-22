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
  return nest({
    ...resp,
    senderKind: ERC20_INTERFACE_ID,
    signerKind: ERC20_INTERFACE_ID,
  })
}

async function routeDelegateCall(receiver, { method, params: { signerToken, senderToken, signerParam, senderParam } }) {
  switch (method) {
    case 'getSignerSideQuote':
      return getDelegateGetSignerSideQuote(receiver, senderParam, senderToken, signerToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerParam: resolveBigNumbers(resp),
          senderParam,
        }),
      )
    case 'getSenderSideQuote':
      return getDelegateGetSenderSideQuote(receiver, signerParam, signerToken, senderToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerParam,
          senderParam: resolveBigNumbers(resp),
        }),
      )
    case 'getSignerSideOrder':
      return getDelegateGetSignerSideQuote(receiver, senderParam, senderToken, signerToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerParam: resolveBigNumbers(resp),
          senderParam,
        }),
      )
    case 'getSenderSideOrder':
      return getDelegateGetSenderSideQuote(receiver, signerParam, signerToken, senderToken).then(resp =>
        format({
          signerToken,
          senderToken,
          signerParam,
          senderParam: resolveBigNumbers(resp),
        }),
      )
    case 'getMaxQuote':
      return getDelegateGetMaxQuote(receiver, senderToken, signerToken).then(resp => {
        const formattedResp = resolveBigNumbers(resp)

        return format({
          signerToken,
          senderToken,
          senderParam: formattedResp.senderParam,
          signerParam: formattedResp.signerParam,
        })
      })
    default:
      throw new Error(`invalid delegate method name ${method}`)
  }
}

module.exports = { routeDelegateCall }
