// @flow
import _ from 'lodash'
import * as ReselectTools from 'reselect-tools'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import queryString from 'query-string'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
import { middleware, rootReducerObj } from './state'

const storageKey = '@airswap_libraries'
const qs = queryString.parse(window.location.search)
if (qs.hardReset) localStorage.removeItem(storageKey)

window._ = _

const actionsBlacklist = [] // ['GOT_CONNECTED_USERS', 'GOT_GAS_SETTINGS', 'GOT_ETH_PRICES', 'GOT_GAS_DATA']

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: [...actionsBlacklist, 'REDUX_STORAGE_SAVE'],
  maxAge: 1000,
})

export default function configureStore(projectMiddleware = [], projectRootReducerObj, defaultState) {
  let engine = createEngine(storageKey)
  engine = filter(engine, [['keySpace', 'signedSeed'], ['events', 'blocks']])
  const persistMiddleware = storage.createMiddleware(engine, actionsBlacklist)

  const rootReducer = combineReducers({ ...projectRootReducerObj, ...rootReducerObj })
  const reducer = storage.reducer(rootReducer)
  const store = createStore(
    reducer,
    defaultState,
    composeEnhancers(applyMiddleware(...[thunk, persistMiddleware, ...middleware, ...projectMiddleware])),
  )
  const load = storage.createLoader(engine)

  load(store)
    .then(newState => {
      store.dispatch({ type: 'LOADED_PREVIOUS_REDUX_STORAGE' })
      console.log('Loaded state:', newState)
    })
    .catch(() => console.log('Failed to load previous state'))
  ReselectTools.getStateWith(() => store.getState())
  return store
}
