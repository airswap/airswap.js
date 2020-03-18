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

export const getAllinfraWhitelist = createSelector(getAllinfraIsWhitelisted, responses =>
  responses.map(({ response, parameters: { contractAddress, account } }) => ({
    whitelisted: response,
    walletAddress: account,
    erc1155Address: contractAddress,
  })),
)
