import { IS_INSTANT, INDEXER_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackIndexerCreateIndex } from './eventTrackingActions'
import { fetchIndexerIndexes } from './contractFunctionActions'
import { getLocatorIntents } from './selectors'

export default function indexerMiddleware(store) {
  return next => action => {
    console.log(getLocatorIntents(store.getState()))
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackIndexerCreateIndex({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
              callback: events => {
                events.map(({ values: { senderToken, signerToken } }) => {
                  store.dispatch(fetchIndexerIndexes({ senderToken, signerToken }))
                })
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
