import _ from 'lodash'
import { fetchSwapSenderAuthorizations } from '../../swap/redux/contractFunctionActions'
import { fetchERC20Allowance } from '../../erc20/redux/contractFunctionActions'
import { fetchERC721GetApprovedOverride } from '../../erc721/redux/actions'

export default function callData(store) {
  return next => action => {
    switch (action.type) {
      case 'TRANSACTION_LOG_EVENT':
        const { event, parameters } = action
        const eventName = event.name.toLowerCase()

        if (eventName === 'authorizesender') {
          store.dispatch(
            fetchSwapSenderAuthorizations({
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              authorizerAddress: event.values.authorizerAddress.toLowerCase(),
              authorizedSender: event.values.authorizedSender.toLowerCase(),
            }),
          )
        }

        if (eventName === 'approval') {
          if (action.namespace === 'ERC721') {
            store.dispatch(
              fetchERC721GetApprovedOverride({
                contractAddress: parameters.contractAddress.toLowerCase(),
                tokenId: parameters.tokenId.toLowerCase(),
              }),
            )
          } else {
            const parsedEventValues = _.mapKeys(event.values, (val, key) => _.trimStart(key, '_'))
            store.dispatch(
              fetchERC20Allowance({
                // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
                contractAddress: event.address.toLowerCase(),
                owner: parsedEventValues.owner.toLowerCase(),
                spender: parsedEventValues.spender.toLowerCase(),
              }),
            )
          }
        }
        break
      default:
    }
    return next(action)
  }
}
