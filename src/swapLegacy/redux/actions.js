import { makePromiseAction } from '../../utils/redux'

export const fillOrder = order => ({
  type: 'FILL_ORDER',
  order,
})

export const cancelOrder = order => ({
  type: 'CANCEL_ORDER',
  order,
})

// EXAMPLE USAGE OF signOrder ACTION CREATOR
// store
//   .dispatch(
//     signOrder({
//       makerAddress: '0x1550d41be3651686e1aeeea073d8d403d0bd2e30',
//       takerAddress: '0x51686d41be3651686e1aee686e1a8d403d0b36516',
//       makerAmount: '2827234430',
//       makerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
//       takerAmount: '50485200000000000000',
//       takerToken: '0x0000000000000000000000000000000000000000',
//       nonce: '123',
//       expiration: '1234567',
//     }),
//   )
//   .then(signedOrder => console.log(signedOrder))
//   .catch(err => console.log(err)) // handle user rejecting sig
export const signOrder = makePromiseAction({
  type: 'SIGN_ORDER',
})
