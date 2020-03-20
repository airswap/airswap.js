import _ from 'lodash'
import { fetchERC1155GetComplianceService, fetchERC1155IsApprovedForAll } from './contractFunctionActions'
import { getComplianceServiceByAddress } from './selectors'
import { waitForState } from '../../utils/redux/waitForState'
import { fetchComplianceServiceIsWhitelisted } from '../../complianceService/redux/contractFunctionActions'

async function fetchOrGetComplianceServiceAddress(store, contractAddress) {
  let complianceServiceAddress = _.get(getComplianceServiceByAddress(store.getState()), contractAddress)

  if (!complianceServiceAddress) {
    store.dispatch(fetchERC1155GetComplianceService({ contractAddress }))
    try {
      await store.dispatch(
        waitForState({
          selector: state => {
            const results = getComplianceServiceByAddress(state)
            const complianceAddress = _.get(results, contractAddress)
            return !!complianceAddress
          },
          result: true,
        }),
      )
    } catch (e) {
      console.error(e)
    }

    complianceServiceAddress = _.get(getComplianceServiceByAddress(store.getState()), contractAddress)
  }

  return complianceServiceAddress
}

export default function callData(store) {
  return next => action => {
    switch (action.type) {
      case 'TRANSACTION_LOG_EVENT':
        const { event } = action

        if (event.name === 'ApprovalForAll') {
          store.dispatch(
            fetchERC1155IsApprovedForAll({
              contractAddress: event.address.toLowerCase(),
              // addresses need to be lowercased, since their responses are matched using the input parameters in lookups
              owner: event.values.owner.toLowerCase(),
              operator: event.values.operator.toLowerCase(),
            }),
          )
        }
        break
      case 'CHECK_ERC_1155_COMPLIANCE_SERVICE_WHITELIST':
        fetchOrGetComplianceServiceAddress(store, action.erc1155Address).then(complianceServiceAddress => {
          store.dispatch(
            fetchComplianceServiceIsWhitelisted({
              contractAddress: complianceServiceAddress.toLowerCase(),
              account: action.walletAddress.toLowerCase(),
            }),
          )
        })
        break
      default:
    }
    return next(action)
  }
}
