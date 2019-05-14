// HTTP ASYNC FETCH REDUX GENERATORS

import { formatErrorMessage } from '../../transformations'
import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'

const HTTP_ACTIONS = [
  { action: 'getting' },
  { action: 'got', paramsKeys: ['response'] },
  { action: 'errorGetting', paramsKeys: ['error'] },
]

const makeHTTPFetchingActionsCreators = items => makeActionCreators(HTTP_ACTIONS, items)
export const makeHTTPActionTypes = items => makeActionTypes(HTTP_ACTIONS, items)

export const makeMiddlewareHTTPFn = (fetchingFn, items, store, action = {}) => {
  const { getting, got, errorGetting } = makeHTTPFetchingActionsCreators(items)
  store.dispatch(getting(items))
  fetchingFn(store, action)
    .then(response => store.dispatch(got(response)))
    .catch(error => store.dispatch(errorGetting(formatErrorMessage(error))))
  const { increment } = action
  if (increment) {
    window.setInterval(() => {
      fetchingFn(store, action)
        .then(response => store.dispatch(got(response)))
        .catch(error => store.dispatch(errorGetting(formatErrorMessage(error))))
    }, increment)
  }
}

const HTTP_REDUCERS = {
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
      getting: [],
      got: ({ response }) => response,
      errorGetting: [],
    },
  },
}

export const makeHTTPReducer = items => makeReducer(HTTP_REDUCERS, HTTP_ACTIONS, items)
export const makeHTTPSelectors = (items, statePath) => makeSelectors(HTTP_REDUCERS, items, statePath)
export const makeHTTPContainers = (items, statePath) => makeContainers(makeHTTPSelectors((items, statePath)))
