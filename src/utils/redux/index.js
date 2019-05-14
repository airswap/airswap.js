// import type { Store, Action } from 'redux'
import _ from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

// GENERALIZED REDUX UTILS

export const makePromiseAction = action => (params = {}) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      ...action,
      resolve,
      reject,
      ...params,
    }),
  )

export const connectSelectorContainer = (selector, name) => connect => Component =>
  connect(
    state => ({ [name]: selector(state) }),
    null,
  )(Component)

export const connectActionContainer = (action, name) => connect => Component =>
  connect(
    null,
    { [name]: action },
  )(Component)

// ACTION CREATION UTILITIES

const actionize = str => _.toUpper(_.snakeCase(str))

export const backCamelize = str => {
  const [first, ...rest] = str
  return `${_.capitalize(first)}${_.camelCase(rest.join(''))}`
}

const concatCamelAction = (first, rest) => actionize(`${_.camelCase(first)}${backCamelize(rest)}`)

const makeItemsAction = (type, name, paramsKeys = []) => ({
  [type]: (...params) => ({
    type: concatCamelAction(type, name),
    ..._.zipObject(paramsKeys, paramsKeys.map((key, i) => params[i])),
  }),
})

export const makeActionTypes = (ACTIONS, name) =>
  _.reduce(
    ACTIONS,
    (obj, val) => ({
      ...obj,
      ...{ [val.action]: concatCamelAction(val.action, name) },
    }),
    {},
  )

export const makeActionCreators = (ACTIONS, name) =>
  _.reduce(
    ACTIONS,
    (obj, val) => ({
      ...obj,
      ...makeItemsAction(val.action, name, val.paramsKeys),
    }),
    {},
  )

// REDUCER CREATION UTILITIES

const concatCamelReducer = (first, rest) => `${_.camelCase(first)}${backCamelize(rest)}`

export const makeReducer = (REDUCERS, ACTIONS, name) => {
  const actionTypes = _.invert(makeActionTypes(ACTIONS, name))
  return combineReducers(
    _.mapKeys(
      _.mapValues(
        REDUCERS,
        reducer =>
          function(state = reducer.defaultState, action) {
            const caseResponse = reducer.switch[actionTypes[action.type]]
            if (!_.isUndefined(caseResponse)) {
              return _.isFunction(caseResponse) ? caseResponse(action, state) : caseResponse
            }
            return state
          },
      ),
      (reducer, key) => key,
    ),
  )
}

// SELECTOR CREATION UTILITIES

export const makeSelectors = (REDUCERS, name, statePath) => {
  const getState = state => _.get(state, `${statePath}.${name}`)
  const values = _.keys(REDUCERS).map(key => createSelector(getState, state => state[key]))
  const keys = _.keys(REDUCERS).map(key => concatCamelReducer('get', concatCamelReducer(key, name)))
  return _.zipObject(keys, values)
}

export const makeSelectorsNested = (REDUCERS, name, statePath) => {
  const getState = state => _.get(state, `${statePath}.${name}`)
  const values = _.keys(REDUCERS).map(key => createSelector(getState, state => state[key]))
  const keys = _.keys(REDUCERS)
  return _.zipObject(keys, values)
}

// CONTAINER CREATION UTILITIES

const trimGet = str => _.camelCase(_.trimStart(str, 'get'))
export const makeContainers = selectors => {
  const containers = _.map(selectors, (selector, name) => connectSelectorContainer(selector, trimGet(name)))
  const keys = _.map(_.keys(selectors), key => trimGet(key))
  return _.zipObject(keys, containers)
}
