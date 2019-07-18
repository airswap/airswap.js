import { makePromiseAction } from '../../utils/redux'

export const fillSwap = order => ({
  type: 'FILL_SWAP',
  order,
})

export const fillSwapSimple = order => ({
  type: 'FILL_SWAP_SIMPLE',
  order,
})

export const cancelSwap = order => ({
  type: 'CANCEL_SWAP',
  order,
})

export const signSwap = makePromiseAction({
  type: 'SIGN_SWAP',
})

export const signSwapSimple = makePromiseAction({
  type: 'SIGN_SWAP_SIMPLE',
})
