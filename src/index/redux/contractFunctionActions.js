// This file is generated code, edits will be overwritten
export const fetchIndexEntries = ({ contractAddress, identifier }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      type: 'FETCH_INDEX_ENTRIES',
      resolve,
      reject,
    }),
  )

export const fetchIndexIsOwner = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_INDEX_IS_OWNER',
      resolve,
      reject,
    }),
  )

export const fetchIndexLength = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_INDEX_LENGTH',
      resolve,
      reject,
    }),
  )

export const fetchIndexOwner = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'FETCH_INDEX_OWNER',
      resolve,
      reject,
    }),
  )

export const submitIndexRenounceOwnership = ({ contractAddress }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      type: 'SUBMIT_INDEX_RENOUNCE_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const submitIndexTransferOwnership = ({ contractAddress, newOwner }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      newOwner,
      type: 'SUBMIT_INDEX_TRANSFER_OWNERSHIP',
      resolve,
      reject,
    }),
  )

export const submitIndexSetLocator = ({ contractAddress, identifier, score, locator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      score,
      locator,
      type: 'SUBMIT_INDEX_SET_LOCATOR',
      resolve,
      reject,
    }),
  )

export const submitIndexUnsetLocator = ({ contractAddress, identifier }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      type: 'SUBMIT_INDEX_UNSET_LOCATOR',
      resolve,
      reject,
    }),
  )

export const submitIndexUpdateLocator = ({ contractAddress, identifier, score, locator }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      score,
      locator,
      type: 'SUBMIT_INDEX_UPDATE_LOCATOR',
      resolve,
      reject,
    }),
  )

export const fetchIndexGetScore = ({ contractAddress, identifier }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      type: 'FETCH_INDEX_GET_SCORE',
      resolve,
      reject,
    }),
  )

export const fetchIndexGetLocator = ({ contractAddress, identifier }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      identifier,
      type: 'FETCH_INDEX_GET_LOCATOR',
      resolve,
      reject,
    }),
  )

export const fetchIndexGetLocators = ({ contractAddress, cursor, limit }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      cursor,
      limit,
      type: 'FETCH_INDEX_GET_LOCATORS',
      resolve,
      reject,
    }),
  )
