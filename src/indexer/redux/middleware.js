import { IS_INSTANT, INDEXER_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackIndexerCreateIndex } from './eventTrackingActions'

export default function indexerMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          store.dispatch(
            trackIndexerCreateIndex({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
            }),
          )
        }
        break
      default:
    }
    next(action)
  }
}
