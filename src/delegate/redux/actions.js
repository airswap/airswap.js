import {
  submitDelegateSetRule,
  submitDelegateSetRuleAndIntent,
  submitDelegateUnsetRuleAndIntent,
} from './contractFunctionActions'
import { getConnectedDelegateContractAddress } from '../../delegateFactory/redux/selectors'
import { submitSwapAuthorizeSender } from '../../swap/redux/contractFunctionActions'
import { getContractPriceFromDisplayPrice } from '../utils'
import { submitERC20Approve } from '../../erc20/redux/contractFunctionActions' //eslint-disable-line
import { AST_CONTRACT_ADDRESS, TOKEN_APPROVAL_AMOUNT } from '../../constants'
import { waitForState } from '../../utils/redux/waitForState'

// EXAMPLE ACTION: sell 25 AST at 0.005 AST/WETH
// TODO: These example actions should be removed after trade-bot is successfully hooked up
export const exampleSetRuleAndIntent = () => dispatch => {
  dispatch(
    submitConnectedDelegateSetRuleAndIntent({
      signerToken: '0x0bd3a1c841211bbb989b35494f661e52e9071fe9', // DAI
      senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
      rule: getContractPriceFromDisplayPrice({
        signerToken: '0x0bd3a1c841211bbb989b35494f661e52e9071fe9',
        senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        senderAmountDisplayValue: '1',
        priceDisplayValue: '2',
      }),
      newStakeAmount: '0',
    }),
  )
  // dispatch(
  //   submitConnectedDelegateSetRuleAndIntent({
  //     senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8', // DAI
  //     signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
  //     rule: getContractPriceFromDisplayPrice({
  //       senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
  //       signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
  //       senderAmountDisplayValue: '1',
  //       priceDisplayValue: '1',
  //     }),
  //     newStakeAmount: '0',
  //   }),
  // )
}

export const approveDelegateTransferAST = () => (dispatch, getState) => {
  const delegateAddress = getConnectedDelegateContractAddress(getState())
  dispatch(
    submitERC20Approve({
      contractAddress: AST_CONTRACT_ADDRESS,
      spender: delegateAddress,
      value: TOKEN_APPROVAL_AMOUNT,
    }),
  )
}

export const exampleSetRule = () =>
  submitConnectedDelegateSetRule(
    getContractPriceFromDisplayPrice({
      senderToken: '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8',
      signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
      senderAmountDisplayValue: '25',
      priceDisplayValue: '0.005',
    }),
  )

export const submitConnectedDelegateSetRuleAndIntent = ({ senderToken, signerToken, rule, newStakeAmount }) => (
  dispatch,
  getState,
) => {
  const contractAddress = getConnectedDelegateContractAddress(getState())
  dispatch(
    submitDelegateSetRuleAndIntent({
      contractAddress,
      senderToken,
      signerToken,
      rule,
      newStakeAmount,
    }),
  )
}

export const submitConnectedDelegateUnsetRuleAndIntent = ({ senderToken, signerToken }) => (dispatch, getState) => {
  const contractAddress = getConnectedDelegateContractAddress(getState())
  dispatch(
    submitDelegateUnsetRuleAndIntent({
      contractAddress,
      senderToken,
      signerToken,
    }),
  )
}

export const submitConnectedDelegateSetRule = ({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }) => (
  dispatch,
  getState,
) => {
  const contractAddress = getConnectedDelegateContractAddress(getState())
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

export const authorizeConnectedDelegateSender = () => async (dispatch, getState) => {
  await dispatch(
    waitForState({
      selector: state => !!getConnectedDelegateContractAddress(state),
      result: true,
    }),
  )
  const contractAddress = getConnectedDelegateContractAddress(getState())
  dispatch(submitSwapAuthorizeSender({ authorizedSender: contractAddress }))
}
