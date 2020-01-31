// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

export default function securitizeMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_SECURITIZE_PRE_TRANSFER_CHECK':
        contractFunctions
          .getSecuritizePreTransferCheck(action.contractAddress, action.from, action.to, action.value)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'securitize',
              name: 'preTransferCheck',
              timestamp: Date.now(),
              parameters: {
                contractAddress: action.contractAddress,
                from: action.from,
                to: action.to,
                value: action.value,
              },
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
