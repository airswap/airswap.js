import { IS_INSTANT, INDEXER_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackIndexSetLocator, trackIndexUnsetLocator } from './eventTrackingActions'

export default function indexMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'REDUX_STORAGE_LOAD':
        if (IS_INSTANT) {
          // this initializes data for indexer/redux/selectors/getLocatorIntents
          store.dispatch(
            trackIndexSetLocator({
              fromBlock: INDEXER_CONTRACT_DEPLOY_BLOCK,
            }),
          )
          store.dispatch(
            trackIndexUnsetLocator({
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
