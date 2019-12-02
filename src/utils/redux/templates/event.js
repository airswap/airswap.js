// HTTP ASYNC FETCH REDUX GENERATORS
import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'

const EVENT_ACTIONS = [
  { action: 'getting' },
  { action: 'got', paramsKeys: ['response'] },
  { action: 'errorGetting', paramsKeys: ['error'] },
]

export const makeEventFetchingActionsCreators = name => makeActionCreators(EVENT_ACTIONS, name)
export const makeEventActionTypes = name => makeActionTypes(EVENT_ACTIONS, name)

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
      got: ({ response }, state) => [...state, ...response],
    },
  },
}

export const makeEventReducer = name => makeReducer(EVENT_REDUCERS, EVENT_ACTIONS, name)
export const makeEventSelectors = (name, statePath) => makeSelectors(EVENT_REDUCERS, name, statePath)
export const makeEventContainers = (name, statePath) => makeContainers(makeEventSelectors((name, statePath)))
