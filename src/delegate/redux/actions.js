import { submitDelegateSetRule, submitDelegateSetRuleAndIntent } from './contractFunctionActions'
import { getConnectedDelegateContract } from '../../delegateFactory/redux/selectors'
import { submitSwapAuthorizeSender } from '../../swap/redux/contractFunctionActions'

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
