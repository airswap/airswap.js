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

export default function indexerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackIndexerCreateIndex({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
              callback: events => {
                crawlMissingTokens(reduceIndexEventsToTokenList(events), store)
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
