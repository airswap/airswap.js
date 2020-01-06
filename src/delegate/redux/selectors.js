import _ from 'lodash'
import { createSelector } from 'reselect'
import bn from 'bignumber.js'
import { getDisplayPriceFromContractPrice } from '../utils'
import { getTokenAddressesBySymbol, getTokensSymbolsByAddress, makeDisplayByToken } from '../../tokens/redux/reducers'
import { getConnectedSwapApprovals } from '../../deltaBalances/redux/reducers'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { getConnectedDelegateContractAddress } from '../../delegateFactory/redux/selectors'
import { getDelegateProvideOrderEvents, getDelegateSetRuleEvents } from './eventTrackingSelectors'
import { getDelegateRules } from './callDataSelectors'
import { getConnectedERC20Approvals } from '../../erc20/redux/selectors'
import { AST_CONTRACT_ADDRESS } from '../../constants'
import { getLocatorIntents } from '../../indexer/redux/selectors'
import { getSwapAuthorizeSenderEvents } from '../../swap/redux/eventTrackingSelectors'

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
  getSwapAuthorizeSenderEvents,
  getConnectedWalletAddress,
  getConnectedDelegateContractAddress,
  (authorizeEvents, walletAddress, delegateContract) => {
    const authorizations = authorizeEvents.map(({ values }) => values)
    return !!authorizations.find(
      ({ authorizerAddress, authorizedSender }) =>
        walletAddress === authorizerAddress.toLowerCase() && delegateContract === authorizedSender.toLowerCase(),
    )
  },
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
  getLocatorIntents,
  getDelegateProvidedOrders,
  getTokensSymbolsByAddress,
  getConnectedSwapApprovals,
  getConnectedDelegateSenderAuthorization,
  makeDisplayByToken,
  (
    allRules,
    rulesEvents,
    locatorIntents,
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
      rules.map(val => {
        const {
          parameters: { contractAddress: delegateAddress, senderToken, signerToken },
        } = val
        const rule = _.find(rulesEvents, { senderToken, signerToken })
        if (!rule) {
          return null
        }
        const intent = locatorIntents.find(
          i => delegateAddress === i.identifier && signerToken === i.signerToken && senderToken === i.senderToken,
        )
        if (!intent) {
          return null
        }
        const { score } = intent

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

        const getDisplayPriceByBaseToken = baseToken =>
          getDisplayPriceFromContractPrice({
            senderToken,
            signerToken,
            maxSenderAmount,
            priceCoef,
            priceExp,
            baseToken,
          })

        const fillRatio = bn(providedOrdersSenderSum)
          .div(maxSenderAmount)
          .toNumber()

        return {
          delegateAddress,
          score,
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
          getDisplayPriceByBaseToken,
        }
      }),
    )
  },
)

const makeGetFormattedDelegateRulesByBaseToken = createSelector(
  getFormattedDelegateRules,
  formattedRules => baseToken =>
    formattedRules.map(rule => ({
      ...rule,
      ...rule.getDisplayPriceByBaseToken(baseToken),
    })),
)

const makeGetFormattedDelegateRulesByBaseTokenSymbol = createSelector(
  getFormattedDelegateRules,
  getTokenAddressesBySymbol,
  (formattedRules, tokenAddressesBySymbol) => baseTokenSymbol =>
    formattedRules.map(rule => ({
      ...rule,
      ...rule.getDisplayPriceByBaseToken(tokenAddressesBySymbol[baseTokenSymbol]),
    })),
)

export const getConnectedDelegateASTApproval = createSelector(
  getConnectedERC20Approvals,
  getConnectedDelegateContractAddress,
  (approvals, delegateAddress) => _.get(approvals, `${delegateAddress}.${AST_CONTRACT_ADDRESS}`),
)

export {
  getFormattedDelegateRules,
  getConnectedDelegateSenderAuthorization,
  getDelegateProvidedOrders,
  makeGetFormattedDelegateRulesByBaseToken,
  makeGetFormattedDelegateRulesByBaseTokenSymbol,
}
