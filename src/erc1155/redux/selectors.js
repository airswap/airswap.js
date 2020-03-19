import _ from 'lodash'
import { createSelector } from 'reselect'
import { getERC1155GetComplianceService } from './callDataSelectors'
import { getAllinfraIsWhitelisted } from '../../allinfra/redux/callDataSelectors'

export const getComplianceServiceByAddress = createSelector(getERC1155GetComplianceService, responses => {
  const formattedResponses = responses.map(({ response, parameters: { contractAddress } }) => [
    contractAddress,
    response,
  ])
  return Object.fromEntries(formattedResponses)
})

export const getAllinfraWhitelist = createSelector(
  getComplianceServiceByAddress,
  getAllinfraIsWhitelisted,
  (complianceServiceByAddress, responses) => {
    const erc1155lookup = _.invert(complianceServiceByAddress)
    return responses.map(({ response, parameters: { contractAddress, account } }) => ({
      whitelisted: response,
      walletAddress: account,
      erc1155Address: erc1155lookup[contractAddress],
    }))
  },
)
