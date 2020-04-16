import { IS_INSTANT, INDEXER_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackIndexerCreateIndex } from './eventTrackingActions'
import { crawlMissingTokens } from '../../tokens/redux/middleware'

function reduceIndexEventsToTokenList(events) {
  const addressSet = events.reduce((agg, event) => {
    const { signerToken, senderToken } = event.values
    agg.add(signerToken.toLowerCase())
    agg.add(senderToken.toLowerCase())
    return agg
  }, new Set())
  return Array.from(addressSet)
}

const gotIndexerTokens = indexerTokens => ({
  type: 'GOT_INDEXER_TOKENS',
  indexerTokens,
})

export default function indexerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackIndexerCreateIndex({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
              callback: events => {
                const indexerTokens = reduceIndexEventsToTokenList(events)
                store.dispatch(gotIndexerTokens(indexerTokens))
                crawlMissingTokens(indexerTokens, store)
              },
            }),
          )
        }
        break
      default:
    }
    next(action)
  }
}
