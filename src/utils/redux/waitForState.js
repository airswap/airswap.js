import _ from 'lodash'
import uuid from 'uuid4'

export const waitForState = ({ selector, result }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      type: 'WAIT_FOR_STATE',
      resolve,
      reject,
      selector,
      result,
      key: uuid(),
    }),
  )

let awaitedStates = {}

function checkAwaitedStates(store) {
  const state = store.getState()
  _.each(awaitedStates, ({ selector, result, resolve, reject }, key) => {
    try {
      if (_.isEqual(selector(state), result)) {
        awaitedStates = _.pickBy(awaitedStates, (val, k) => k !== key)
        resolve(selector(state))
      }
    } catch (e) {
      awaitedStates = _.pickBy(awaitedStates, (val, k) => k !== key)
      reject(e)
    }
  })
}

export function waitForStateMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'WAIT_FOR_STATE':
        const { key, resolve, reject, selector, result } = action
        awaitedStates[key] = { resolve, reject, selector, result }
        break
      default:
    }
    next(action)
    checkAwaitedStates(store)
  }
}
