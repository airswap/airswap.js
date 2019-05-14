// FORM INPUT REDUX GENERATORS
import _ from 'lodash'
import {
  makeContainers,
  makeActionCreators,
  makeActionTypes,
  makeReducer,
  makeSelectors,
  makeSelectorsNested,
} from '../index'

export const FORM_INPUT_ACTIONS = [
  { action: 'change', paramsKeys: ['value'] },
  { action: 'parsedValue', paramsKeys: ['value'] },
  { action: 'clear' },
  { action: 'violationOn', paramsKeys: ['violation'] },
]
export const makeFormInputActionsCreators = name => makeActionCreators(FORM_INPUT_ACTIONS, name)
export const makeFormInputActionTypes = name => makeActionTypes(FORM_INPUT_ACTIONS, name)
export const makeFormInputActionTypesMap = name => _.invert(makeActionTypes(FORM_INPUT_ACTIONS, name))

export const makeMiddlewareFormInputFn = (parsingFn, name, store, action, ...rest) => {
  const { parsedValue, violationOn } = makeFormInputActionsCreators(name)
  const parsingResp = parsingFn(store, action, ...rest)
  store.dispatch(parsedValue(parsingResp.value))
  if (parsingResp.violation) {
    store.dispatch(violationOn(parsingResp.violation))
  }
}

const FORM_INPUT_REDUCERS = {
  value: {
    defaultState: '',
    switch: {
      parsedValue: ({ value }) => value,
      clear: '',
    },
  },
  violation: {
    defaultState: '',
    switch: {
      violationOn: ({ violation }) => violation,
      clear: '',
    },
  },
}

export const makeFormInputReducer = items => makeReducer(FORM_INPUT_REDUCERS, FORM_INPUT_ACTIONS, items)
export const makeFormInputSelectors = (items, statePath) => makeSelectors(FORM_INPUT_REDUCERS, items, statePath)
export const makeFormInputSelectorsNested = (items, statePath) =>
  makeSelectorsNested(FORM_INPUT_REDUCERS, items, statePath)
export const makeFormInputContainers = (items, statePath) => makeContainers(makeFormInputSelectors(items, statePath))
