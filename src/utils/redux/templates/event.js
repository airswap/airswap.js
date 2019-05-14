// HTTP ASYNC FETCH REDUX GENERATORS
import _ from 'lodash'
import { formatErrorMessage } from '../../transformations'
import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'
import { fetchAndPollLogs } from '../../../events'
import { lookupBlockByTimestamp } from '../../ethereumDatetime'

const EVENT_ACTIONS = [
  { action: 'getting' },
  { action: 'got', paramsKeys: ['response'] },
  { action: 'errorGetting', paramsKeys: ['error'] },
]

export const makeEventFetchingActionsCreators = name => makeActionCreators(EVENT_ACTIONS, name)
export const makeEventActionTypes = name => makeActionTypes(EVENT_ACTIONS, name)

export const makeMiddlewareEventFn = async (params, name, store) => {
  const { fromBlock, timestamp, contractAddress, abi, topic } = params
  let block
  if (timestamp && !fromBlock) {
    block = await lookupBlockByTimestamp(timestamp)
  } else if (fromBlock) {
    block = fromBlock
  }
  const { getting, got, errorGetting } = makeEventFetchingActionsCreators(name)
  const successCallback = logs => store.dispatch(got(logs))
  const failureCallback = e => store.dispatch(errorGetting(formatErrorMessage(e)))

  fetchAndPollLogs(successCallback, failureCallback, contractAddress, abi, topic, block)
  store.dispatch(getting())
}

const EVENT_REDUCERS = {
  attemptedGetting: {
    defaultState: false,
    switch: {
      getting: true,
      got: true,
      errorGetting: true,
    },
  },
  getting: {
    defaultState: false,
    switch: {
      getting: true,
      got: false,
      errorGetting: false,
    },
  },
  errorGetting: {
    defaultState: '',
    switch: {
      getting: '',
      got: '',
      errorGetting: ({ error }) => error,
    },
  },
  fetched: {
    defaultState: [],
    switch: {
      got: ({ response }, state) => _.uniqBy([...state, ...response], 'transactionHash'),
    },
  },
}

export const makeEventReducer = name => makeReducer(EVENT_REDUCERS, EVENT_ACTIONS, name)
export const makeEventSelectors = (name, statePath) => makeSelectors(EVENT_REDUCERS, name, statePath)
export const makeEventContainers = (name, statePath) => makeContainers(makeEventSelectors((name, statePath)))
