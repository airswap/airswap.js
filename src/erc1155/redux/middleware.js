import { fetchERC1155IsApprovedForAll } from './contractFunctionActions'

export default function callData(store) {
  return next => action => {
    switch (action.type) {
      case 'TRANSACTION_LOG_EVENT':
        const { event } = action

        if (event.name === 'ApprovalForAll') {
          store.dispatch(
            fetchERC1155IsApprovedForAll({
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              owner: event.values.owner.toLowerCase(),
              operator: event.values.operator.toLowerCase(),
            }),
          )
        }
        break
      default:
    }
    return next(action)
  }
}
