import { getSwapDelegateApprovals } from '../../swap/redux/contractFunctionActions'
import { getERC20Allowance } from '../../erc20/redux/contractFunctionActions'

export default function callData(store) {
  return next => action => {
    switch (action.type) {
      case 'TRANSACTION_LOG_EVENT':
        const { event } = action
        const eventName = event.name.toLowerCase()
        if (eventName === 'authorize') {
          store.dispatch(
            getSwapDelegateApprovals({
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              approver: event.values.approver.toLowerCase(),
              delegate: event.values.delegate.toLowerCase(),
            }),
          )
        }

        if (eventName === 'approval') {
          store.dispatch(
            getERC20Allowance({
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              contractAddress: event.address.toLowerCase(),
              owner: event.values.owner.toLowerCase(),
              spender: event.values.spender.toLowerCase(),
            }),
          )
        }
        break
      default:
    }
    return next(action)
  }
}
