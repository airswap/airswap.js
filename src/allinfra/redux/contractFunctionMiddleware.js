// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

export default function allinfraMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_ALLINFRA_IS_WHITELISTED':
        contractFunctions
          .getAllinfraIsWhitelisted(action.contractAddress, action.account)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'allinfra',
              name: 'isWhitelisted',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, account: action.account },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
