import _ from 'lodash'
import { abis, erc20, erc721 } from '../index'

function getAbiForToken(token) {
  if (token.kind === 'ERC721') {
    return erc721
  }
  return erc20
}

function abiReducer(state = abis, action) {
  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.tokens) {
        const addresses = action.tokens.map(({ address }) => address.toLowerCase())
        const tokenAbis = action.tokens.map(getAbiForToken)
        const newAbis = _.zipObject(addresses, tokenAbis)
        return {
          ...state,
          ...newAbis,
        }
      } else if (action.token) {
        return {
          ...state,
          [action.token.address.toLowerCase()]: getAbiForToken(action.token),
        }
      }
      return state

    default:
      return state
  }
}

export const getAbis = state => state.abis

export default abiReducer
