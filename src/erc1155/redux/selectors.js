import _ from 'lodash'
import { createSelector } from 'reselect'
import { getERC1155GetComplianceService } from './callDataSelectors'
import { getComplianceServiceIsWhitelisted } from '../../complianceService/redux/callDataSelectors'

export const getComplianceServiceByAddress = createSelector(getERC1155GetComplianceService, responses => {
  const formattedResponses = responses.map(({ response, parameters: { contractAddress } }) => [
    contractAddress.toLowerCase(),
    response.toLowerCase(),
  ])
  return Object.fromEntries(formattedResponses)
})

export const getComplianceServiceWhitelist = createSelector(
  getComplianceServiceByAddress,
  getComplianceServiceIsWhitelisted,
  (complianceServiceByAddress, responses) => {
    const erc1155lookup = _.invert(complianceServiceByAddress)
    return responses.map(({ response, parameters: { contractAddress, account } }) => ({
      whitelisted: response,
      walletAddress: account,
      erc1155Address: erc1155lookup[contractAddress.toLowerCase()],
    }))
  },
)
