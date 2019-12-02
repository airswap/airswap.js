import _ from 'lodash'
import { createSelector } from 'reselect'
import bn from 'bignumber.js'
// import { getDelegateRules } from './callDataSelectors'
import { getDisplayPriceFromContractPrice } from '../utils'
import { getTokensSymbolsByAddress, makeDisplayByToken } from '../../tokens/redux/reducers'
import { getConnectedSwapApprovals } from '../../deltaBalances/redux/reducers'
import { getSwapSenderAuthorizations } from '../../swap/redux/callDataSelectors'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { getConnectedDelegateContractAddress } from '../../delegateFactory/redux/selectors'
import { getDelegateProvideOrderEvents, getDelegateSetRuleEvents } from './eventTrackingSelectors'
import { getDelegateRules } from './callDataSelectors'

const getDelegateRulesEvents = createSelector(getDelegateSetRuleEvents, events =>
  _.uniqBy(
    _.sortBy(
      events.map(({ values, blockNumber, address }) => ({
        blockNumber,
        address,
        ...values,
      })),
      'blockNumber',
    ).reverse(),
    ({ senderToken, signerToken, address }) => [senderToken, signerToken, address].join(''),
  ),
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
  makeDisplayByToken,
  (
    allRules,
    rulesEvents,
    providedOrders,
    tokensSymbolsByAddress,
    connectedSwapApprovals,
    delegateSenderApproval,
    displayByToken,
  ) => {
    if (_.isEmpty(tokensSymbolsByAddress)) {
      return []
    }
    const rules = allRules.filter(rule => !(rule.response.priceCoef === '0' && rule.response.priceExp === '0')) // this is the only deterministic way to tell if a rule has been unset

    return _.compact(
      rules.map(({ parameters: { contractAddress: delegateAddress, senderToken, signerToken } }) => {
        const rule = _.find(rulesEvents, { senderToken, signerToken })
        if (!rule) {
          return null
        }
        const { blockNumber, maxSenderAmount, priceCoef, priceExp } = rule
        const providedOrdersForRule = _.filter(
          providedOrders || [],
          order =>
            order.blockNumber >= blockNumber && order.senderToken === senderToken && order.signerToken === signerToken,
        )
        const providedOrdersSenderSum = _.reduce(
          providedOrdersForRule,
          (sum, order) =>
            bn(sum)
              .add(order.senderAmount)
              .toString(),
          '0',
        )

        const providedOrdersSenderSumDisplayValue = `${displayByToken(
          { address: senderToken },
          providedOrdersSenderSum,
        )}`

        const {
          senderAmountDisplayValue,
          signerAmountDisplayValue,
          priceDisplayValue,
        } = getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp })

        const fillRatio = bn(providedOrdersSenderSum)
          .div(maxSenderAmount)
          .toNumber()

        return {
          delegateAddress,
          senderAmountDisplayValue,
          signerAmountDisplayValue,
          priceDisplayValue,
          senderToken,
          signerToken,
          providedOrdersSenderSumDisplayValue,
          fillRatio,
          senderSymbol: tokensSymbolsByAddress[senderToken],
          signerSymbol: tokensSymbolsByAddress[signerToken],
          maxSenderAmount,
          providedOrders: providedOrdersForRule,
          approvals: {
            tokenSwapApproval: _.get(connectedSwapApprovals, senderToken),
            delegateSenderApproval,
          },
        }
      }),
    )
  },
)

export { getFormattedDelegateRules, getConnectedDelegateSenderAuthorization, getDelegateProvidedOrders }
