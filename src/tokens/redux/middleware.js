import _ from 'lodash'
import tokenMetadata from '../index'
import { getTokenAddresses } from './reducers'
import { waitForState } from '../../utils/redux/waitForState'
import { crawlToken } from './actions'

async function dispatchTokenInit(store) {
  const tokens = await tokenMetadata.ready
  store.dispatch(addTokens([...tokens]))
  store.dispatch({ type: 'TOKENS_LOADED' })
}

export const addToken = token => ({
  type: 'ADD_TOKEN',
  token,
})

export const addNFTItem = token => ({
  type: 'ADD_NFT_ITEM',
  token,
})

export const addTokens = tokens => ({
  type: 'ADD_TOKEN',
  tokens,
})

export async function crawlMissingTokens(tokenAddresses, store) {
  await store.dispatch(
    waitForState({
      selector: state => state.tokens.ready,
      result: true,
    }),
  )
  const state = store.getState()
  const existingTokens = getTokenAddresses(state)
  const missingTokens = _.difference(tokenAddresses, existingTokens)
  missingTokens.forEach(token => store.dispatch(crawlToken(token)))
}

export default function balancesMiddleware(store) {
  dispatchTokenInit(store)

  return next => action => {
    switch (action.type) {
      case 'CRAWL_TOKEN':
        tokenMetadata.crawlToken(action.address, action.forceUIApproval).then(token => store.dispatch(addToken(token)))
        break
      case 'CRAWL_NFT_ITEM':
        tokenMetadata.crawlNFTItem(action.address, action.id).then(token => store.dispatch(addNFTItem(token)))
        break
      default:
    }
    return next(action)
  }
}
