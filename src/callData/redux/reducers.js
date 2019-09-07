// import { createSelector } from 'reselect'

function callData(state = [], action) {
  switch (action.type) {
    case 'GOT_CALL_RESPONSE':
      const { response, namespace, name, parameters, timestamp } = action
      return [{ response, namespace, name, parameters, timestamp }, ...state]
    default:
      return state
  }
}

export default callData

const getCallData = state => state.callData

export const selectors = {
  getCallData,
}
