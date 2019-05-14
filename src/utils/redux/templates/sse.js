// SSE ASYNC FETCH REDUX GENERATORS
import _ from 'lodash'
import { SSE } from 'sse.js'
import { makeContainers, makeActionCreators, makeActionTypes, makeReducer, makeSelectors } from '../index'

window.SSE = SSE

const SSE_ACTIONS = [
  { action: 'connecting' },
  { action: 'connected' },
  { action: 'errorConnecting', paramsKeys: ['error'] },
  { action: 'got', paramsKeys: ['response'] },
  { action: 'closed' },
]

const makeSSEFetchingActionsCreators = name => makeActionCreators(SSE_ACTIONS, name)
export const makeSSEActionTypes = name => makeActionTypes(SSE_ACTIONS, name)

export const makeMiddlewareSSEFn = (queryURL, name, store, params = {}) => {
  const { payload, timeout } = params
  const { connecting, connected, got } = makeSSEFetchingActionsCreators(name)
  store.dispatch(connecting())

  const evtSource = new SSE(queryURL, {
    headers: { 'Content-Type': 'application/json' },
    payload: payload ? JSON.stringify(payload) : undefined,
    method: 'POST',
  })

  evtSource.onopen = () => {
    store.dispatch(connected(evtSource))
  }

  let log = []
  const batchLog = () => {
    store.dispatch(got(log))
    log = []
  }
  const debounced = _.debounce(batchLog, 500, { maxWait: 1000 })
  evtSource.onmessage = e => {
    log.push(e.data)
    debounced()
  }
  // TODO: Error handling is buggy is this library. It fires error events on non-errors, will revisit to find a better solution
  // evtSource.onerror = error => {
  //   store.dispatch(errorConnecting(error))
  // }

  window.setTimeout(() => evtSource.close(), timeout || 8000)

  evtSource.stream()
}

const SSE_REDUCERS = {
  attemptedConnecting: {
    defaultState: false,
    switch: {
      connecting: true,
      connected: true,
      errorConnecting: true,
    },
  },
  connecting: {
    defaultState: false,
    switch: {
      connecting: true,
      connected: false,
      errorConnecting: false,
      closed: false,
    },
  },
  errorConnecting: {
    defaultState: '',
    switch: {
      connecting: '',
      connected: '',
      errorConnecting: ({ error }) => error,
    },
  },
  connected: {
    defaultState: false,
    switch: {
      connecting: false,
      connected: true,
      errorConnecting: false,
      closed: false,
    },
  },
  fetched: {
    defaultState: [],
    switch: {
      connecting: [],
      got: ({ response }, state) => {
        const formattedResponse = _.compact(
          response.map(r => {
            try {
              return r ? JSON.parse(r) : r
            } catch (e) {
              return ''
            }
          }),
        )
        return [...state, ...formattedResponse]
      },
    },
  },
}

export const makeSSEReducer = name => makeReducer(SSE_REDUCERS, SSE_ACTIONS, name)
export const makeSSESelectors = (name, statePath) => makeSelectors(SSE_REDUCERS, name, statePath)
export const makeSSEContainers = (name, statePath) => makeContainers(makeSSESelectors((name, statePath)))
