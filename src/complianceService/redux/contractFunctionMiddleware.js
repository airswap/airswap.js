// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

export default function complianceServiceMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_COMPLIANCE_SERVICE_IS_WHITELISTED':
        contractFunctions
          .getComplianceServiceIsWhitelisted(action.contractAddress, action.account)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'complianceService',
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
