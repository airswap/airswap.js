import _ from 'lodash'
import { createSelector } from 'reselect'
// import { getDelegateRules } from './callDataSelectors'
import { getDisplayPriceFromContractPrice } from '../utils'
import { getTokensSymbolsByAddress } from '../../tokens/redux/reducers'
import { getConnectedSwapApprovals } from '../../deltaBalances/redux/reducers'
import { getSwapSenderAuthorizations } from '../../swap/redux/callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { getConnectedDelegateContractAddress } from '../../delegateFactory/redux/selectors'
import { getDelegateProvideOrderEvents, getDelegateSetRuleEvents } from './eventTrackingSelectors'
import { getDelegateRules } from './callDataSelectors'

const getDelegateRulesEvents = createSelector(getDelegateSetRuleEvents, events =>
  _.sortBy(
    events.map(({ values, blockNumber }) => ({
      blockNumber,
      ...values,
    })),
    'blockNumber',
  ).reverse(),
)

const getConnectedDelegateSenderAuthorization = createSelector(
  getSwapSenderAuthorizations,
  getConnectedWalletAddress,
  getConnectedDelegateContractAddress,
  (authorizations, walletAddress, delegateContract) =>
    !!authorizations.find(
      ({ parameters: { authorizerAddress, authorizedSender } }) =>
        walletAddress === authorizerAddress && delegateContract === authorizedSender,
    ),
)

const getDelegateProvidedOrders = createSelector(getDelegateProvideOrderEvents, events =>
  events.map(
    ({ values: { owner, tradeWallet, senderToken, signerToken, senderAmount, priceCoef, priceExp }, blockNumber }) => ({
      owner,
      tradeWallet,
      senderToken,
      signerToken,
      senderAmount,
      priceCoef,
      priceExp,
      blockNumber,
    }),
  ),
)

const getFormattedDelegateRules = createSelector(
  getDelegateRules,
  getDelegateRulesEvents,
  getDelegateProvidedOrders,
  getTokensSymbolsByAddress,
  getConnectedSwapApprovals,
  getConnectedDelegateSenderAuthorization,
  (rules, rulesEvents, providedOrders, tokensSymbolsByAddress, connectedSwapApprovals, delegateSenderApproval) => {
    if (_.isEmpty(tokensSymbolsByAddress)) {
      return []
    }

    return rules.map(({ parameters: { contractAddress: delegateAddress, senderToken, signerToken } }) => {
      const { blockNumber, maxSenderAmount, priceCoef, priceExp } = _.find(rulesEvents, { senderToken, signerToken })
      const providedOrdersForRule = _.filter(
        providedOrders,
        order =>
          order.blockNumber >= blockNumber && order.senderToken === senderToken && order.signerToken === signerToken,
      )
      return {
        delegateAddress,
        ...getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }),
        senderSymbol: tokensSymbolsByAddress[senderToken],
        signerSymbol: tokensSymbolsByAddress[signerToken],
        maxSenderAmount,
        providedOrders: providedOrdersForRule,
        approvals: {
          tokenSwapApproval: _.get(connectedSwapApprovals, senderToken),
          delegateSenderApproval,
        },
      }
    })
  },
)

export { getFormattedDelegateRules, getConnectedDelegateSenderAuthorization, getDelegateProvidedOrders }
