import { IS_INSTANT, INDEXER_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackIndexerCreateIndex } from './eventTrackingActions'
import { fetchIndexerIndexes } from './contractFunctionActions'

export default function indexerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackIndexerCreateIndex({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
              callback: events => {
                events.map(({ values: { senderToken, signerToken } }) => {
                  // the commented dispatch command below will be used when transitioning away from event-driven global on-chain index building
                  // store.dispatch(
                  //   fetchIndexerGetLocators({
                  //     senderToken,
                  //     signerToken,
                  //     cursor: INDEX_HEAD,
                  //     limit: 10,
                  //   }),
                  // )
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
