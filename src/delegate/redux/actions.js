import { submitDelegateSetRule, submitDelegateSetRuleAndIntent } from './contractFunctionActions'
import { getConnectedDelegateContract } from '../../delegateFactory/redux/selectors'
import { submitSwapAuthorizeSender } from '../../swap/redux/contractFunctionActions'
import { getContractPriceFromDisplayPrice } from '../utils' //eslint-disable-line

// EXAMPLE ACTION: sell 25 AST at 0.005 AST/WETH
// TODO: These example actions should be removed after trade-bot is successfully hooked up
export const exampleSetRuleAndIntent = () => dispatch => {
  dispatch(
    submitConnectedDelegateSetRuleAndIntent({
      signerToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', // LGO
      senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
      rule: getContractPriceFromDisplayPrice({
        signerToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
        senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        senderAmountDisplayValue: '1',
        priceDisplayValue: '1',
      }),
      newStakeAmount: '0',
    }),
  )
  dispatch(
    submitConnectedDelegateSetRuleAndIntent({
      senderToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', // LGO
      signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
      rule: getContractPriceFromDisplayPrice({
        senderToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
        signerToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        senderAmountDisplayValue: '1',
        priceDisplayValue: '1',
      }),
      newStakeAmount: '0',
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
  const contractAddress = getConnectedDelegateContract(getState())
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
