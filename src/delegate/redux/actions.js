import { submitDelegateSetRule, submitDelegateSetRuleAndIntent } from './contractFunctionActions'
import { getConnectedDelegateContract } from '../../delegateFactory/redux/selectors'
import { submitSwapAuthorizeSender } from '../../swap/redux/contractFunctionActions'
import { getContractPriceFromDisplayPrice } from '../utils' //eslint-disable-line

// EXAMPLE ACTION: sell 25 AST at 0.005 AST/WETH
export const exampleSetRuleAndIntent = () => dispatch =>
  getContractPriceFromDisplayPrice({
    senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
    signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
    senderAmountDisplayValue: '25',
    priceDisplayValue: '0.005',
  }).then(rule =>
    dispatch(
      submitConnectedDelegateSetRuleAndIntent({
        senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
        signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        rule,
        amountToStake: '0',
      }),
    ),
  )

export const exampleSetRule = () => dispatch =>
  getContractPriceFromDisplayPrice({
    senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
    signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
    senderAmountDisplayValue: '25',
    priceDisplayValue: '0.005',
  }).then(rule => dispatch(submitConnectedDelegateSetRule(rule)))

export const submitConnectedDelegateSetRuleAndIntent = ({ senderToken, signerToken, rule, amountToStake }) => (
  dispatch,
  getState,
) => {
  const contractAddress = getConnectedDelegateContract(getState())
  dispatch(
    submitDelegateSetRuleAndIntent({
      contractAddress,
      senderToken,
      signerToken,
      rule,
      amountToStake,
    }),
  )
}

export const submitConnectedDelegateSetRule = ({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) => (
  dispatch,
  getState,
) => {
  const contractAddress = getConnectedDelegateContract(getState())
  dispatch(
    submitDelegateSetRule({
      contractAddress,
      senderToken,
      signerToken,
      maxSenderAmount,
      priceCoef,
      priceExp,
    }),
  )
}

export const authorizeConnectedDelegateSender = () => (dispatch, getState) => {
  const contractAddress = getConnectedDelegateContract(getState())
  dispatch(submitSwapAuthorizeSender({ authorizedSender: contractAddress }))
}
