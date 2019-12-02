// @flow
import _ from 'lodash'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import queryString from 'querystring'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
import { middleware, rootReducerObj } from './state'
import { waitForStateMiddleware } from '../utils/redux/waitForState'

const storageKey = '@airswap.js'
const qs = queryString.parse(window.location.search)
if (qs.hardReset) localStorage.removeItem(storageKey)

window._ = _

const actionsBlacklist = ['GOT_LATEST_BLOCK'] // ['GOT_CONNECTED_USERS', 'GOT_GAS_SETTINGS', 'GOT_ETH_PRICES', 'GOT_GAS_DATA']

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: [...actionsBlacklist, 'REDUX_STORAGE_SAVE'],
  maxAge: 500,
})

export default function configureStore(
  projectMiddleware = [],
  projectRootReducerObj,
  defaultState,
  persistedState = [],
) {
  let engine = createEngine(storageKey)
  engine = filter(engine, [['keySpace', 'signedSeed'], 'blockTracker', ['wallet', 'expressLogin'], ...persistedState])
  const persistMiddleware = storage.createMiddleware(engine, actionsBlacklist)
  const rootReducer = combineReducers(_.pickBy({ ...projectRootReducerObj, ...rootReducerObj }, _.identity))
  const reducer = storage.reducer(rootReducer)
  const store = createStore(
    reducer,
    defaultState,
    composeEnhancers(
      applyMiddleware(...[thunk, persistMiddleware, waitForStateMiddleware, ...middleware, ...projectMiddleware]),
    ),
  )
  const load = storage.createLoader(engine)

  load(store)
    .then(newState => {
      store.dispatch({ type: 'LOADED_PREVIOUS_REDUX_STORAGE' })
      console.log('Loaded state:', newState)
    })
    .catch(() => console.log('Failed to load previous state'))
  return store
}
