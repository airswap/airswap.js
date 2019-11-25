import _ from 'lodash'
import { createSelector } from 'reselect'
import { getDelegateRules } from './callDataSelectors'
import { getDisplayPriceFromContractPrice } from '../utils'
import { getTokensSymbolsByAddress } from '../../tokens/redux/reducers'
import { getConnectedSwapApprovals } from '../../deltaBalances/redux/reducers'
import { getSwapSenderAuthorizations } from '../../swap/redux/callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { getConnectedDelegateContract } from '../../delegateFactory/redux/selectors'

const getConnectedDelegateSenderAuthorization = createSelector(
  getSwapSenderAuthorizations,
  getConnectedWalletAddress,
  getConnectedDelegateContract,
  (authorizations, walletAddress, delegateContract) =>
    !!authorizations.find(
      ({ parameters: { authorizerAddress, authorizedSender } }) =>
        walletAddress === authorizerAddress && delegateContract === authorizedSender,
    ),
)

const getFormattedDelegateRules = createSelector(
  getDelegateRules,
  getTokensSymbolsByAddress,
  getConnectedSwapApprovals,
  getConnectedDelegateSenderAuthorization,
  (rules, tokensSymbolsByAddress, connectedSwapApprovals, delegateSenderApproval) => {
    if (_.isEmpty(tokensSymbolsByAddress)) {
      return []
    }

    return rules.map(
      ({
        parameters: { contractAddress: delegateAddress, senderToken, signerToken },
        response: { maxSenderAmount, priceCoef, priceExp },
      }) => ({
        delegateAddress,
        ...getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }),
        senderSymbol: tokensSymbolsByAddress[senderToken],
        signerSymbol: tokensSymbolsByAddress[signerToken],
        maxSenderAmount,
        approvals: {
          tokenSwapApproval: _.get(connectedSwapApprovals, senderToken),
          delegateSenderApproval,
        },
      }),
    )
  },
)

export { getFormattedDelegateRules, getConnectedDelegateSenderAuthorization }
