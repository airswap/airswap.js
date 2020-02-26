// This file is generated code, edits will be overwritten
export const fetchDelegateIndexer = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_INDEXER',
      resolve,
      reject,
    }),
  )

export const fetchDelegateIsOwner = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_IS_OWNER',
      resolve,
      reject,
    }),
  )

export const fetchDelegateOwner = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_OWNER',
      resolve,
      reject,
    }),
  )

export const fetchDelegateProtocol = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_PROTOCOL',
      resolve,
      reject,
    }),
  )

export const submitDelegateRenounceOwnership = ({ contractAddress, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      options,
      type: 'SUBMIT_DELEGATE_RENOUNCE_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const fetchDelegateRules = ({ contractAddress, senderToken, signerToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      type: 'FETCH_DELEGATE_RULES',
      resolve,
      reject,
    }),
  )

export const fetchDelegateSwapContract = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_SWAP_CONTRACT',
      resolve,
      reject,
    }),
  )

export const fetchDelegateTradeWallet = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_DELEGATE_TRADE_WALLET',
      resolve,
      reject,
    }),
  )

export const submitDelegateTransferOwnership = ({ contractAddress, newOwner, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      newOwner,
      options,
      type: 'SUBMIT_DELEGATE_TRANSFER_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const submitDelegateSetRule = ({
  contractAddress,
  senderToken,
  signerToken,
  maxSenderAmount,
  priceCoef,
  priceExp,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      maxSenderAmount,
      priceCoef,
      priceExp,
      options,
      type: 'SUBMIT_DELEGATE_SET_RULE',
      resolve,
      reject,
    }),
  )

export const submitDelegateUnsetRule = ({ contractAddress, senderToken, signerToken, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      options,
      type: 'SUBMIT_DELEGATE_UNSET_RULE',
      resolve,
      reject,
    }),
  )

export const submitDelegateSetRuleAndIntent = ({
  contractAddress,
  senderToken,
  signerToken,
  rule,
  newStakeAmount,
  options,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      rule,
      newStakeAmount,
      options,
      type: 'SUBMIT_DELEGATE_SET_RULE_AND_INTENT',
      resolve,
      reject,
    }),
  )

export const submitDelegateUnsetRuleAndIntent = ({ contractAddress, senderToken, signerToken, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      options,
      type: 'SUBMIT_DELEGATE_UNSET_RULE_AND_INTENT',
      resolve,
      reject,
    }),
  )

export const submitDelegateProvideOrder = ({ contractAddress, order, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      order,
      options,
      type: 'SUBMIT_DELEGATE_PROVIDE_ORDER',
      resolve,
      reject,
    }),
  )

export const submitDelegateSetTradeWallet = ({ contractAddress, newTradeWallet, options }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      newTradeWallet,
      options,
      type: 'SUBMIT_DELEGATE_SET_TRADE_WALLET',
      resolve,
      reject,
    }),
  )

export const fetchDelegateGetSignerSideQuote = ({
  contractAddress,
  senderAmount,
  senderToken,
  signerToken,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderAmount,
      senderToken,
      signerToken,
      type: 'FETCH_DELEGATE_GET_SIGNER_SIDE_QUOTE',
      resolve,
      reject,
    }),
  )

export const fetchDelegateGetSenderSideQuote = ({
  contractAddress,
  signerAmount,
  signerToken,
  senderToken,
}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      signerAmount,
      signerToken,
      senderToken,
      type: 'FETCH_DELEGATE_GET_SENDER_SIDE_QUOTE',
      resolve,
      reject,
    }),
  )

export const fetchDelegateGetMaxQuote = ({ contractAddress, senderToken, signerToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      senderToken,
      signerToken,
      type: 'FETCH_DELEGATE_GET_MAX_QUOTE',
      resolve,
      reject,
    }),
  )
