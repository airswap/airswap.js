// This file is generated code, edits will be overwritten
export const fetchIndexerIndexes = ({ signerToken, senderToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerToken,
      senderToken,
      type: 'FETCH_INDEXER_INDEXES',
      resolve,
      reject,
    }),
  )

export const fetchIndexerIsOwner = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_INDEXER_IS_OWNER',
      resolve,
      reject,
    }),
  )

export const fetchIndexerLocatorWhitelist = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_INDEXER_LOCATOR_WHITELIST',
      resolve,
      reject,
    }),
  )

export const fetchIndexerOwner = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_INDEXER_OWNER',
      resolve,
      reject,
    }),
  )

export const submitIndexerRenounceOwnership = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'SUBMIT_INDEXER_RENOUNCE_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const fetchIndexerStakingToken = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'FETCH_INDEXER_STAKING_TOKEN',
      resolve,
      reject,
    }),
  )

export const fetchIndexerTokenBlacklist = ({ token }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      token,
      type: 'FETCH_INDEXER_TOKEN_BLACKLIST',
      resolve,
      reject,
    }),
  )

export const submitIndexerTransferOwnership = ({ newOwner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newOwner,
      type: 'SUBMIT_INDEXER_TRANSFER_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const submitIndexerSetLocatorWhitelist = ({ newLocatorWhitelist }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      newLocatorWhitelist,
      type: 'SUBMIT_INDEXER_SET_LOCATOR_WHITELIST',
      resolve,
      reject,
    }),
  )

export const submitIndexerCreateIndex = ({ signerToken, senderToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerToken,
      senderToken,
      type: 'SUBMIT_INDEXER_CREATE_INDEX',
      resolve,
      reject,
    }),
  )

export const submitIndexerAddTokenToBlacklist = ({ token }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      token,
      type: 'SUBMIT_INDEXER_ADD_TOKEN_TO_BLACKLIST',
      resolve,
      reject,
    }),
  )

export const submitIndexerRemoveTokenFromBlacklist = ({ token }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      token,
      type: 'SUBMIT_INDEXER_REMOVE_TOKEN_FROM_BLACKLIST',
      resolve,
      reject,
    }),
  )

export const submitIndexerSetIntent = ({ signerToken, senderToken, stakingAmount, locator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerToken,
      senderToken,
      stakingAmount,
      locator,
      type: 'SUBMIT_INDEXER_SET_INTENT',
      resolve,
      reject,
    }),
  )

export const submitIndexerUnsetIntent = ({ signerToken, senderToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerToken,
      senderToken,
      type: 'SUBMIT_INDEXER_UNSET_INTENT',
      resolve,
      reject,
    }),
  )

export const fetchIndexerGetLocators = ({ signerToken, senderToken, cursor, limit }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      signerToken,
      senderToken,
      cursor,
      limit,
      type: 'FETCH_INDEXER_GET_LOCATORS',
      resolve,
      reject,
    }),
  )

export const fetchIndexerGetStakedAmount = ({ user, signerToken, senderToken }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      user,
      signerToken,
      senderToken,
      type: 'FETCH_INDEXER_GET_STAKED_AMOUNT',
      resolve,
      reject,
    }),
  )
