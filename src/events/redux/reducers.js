/** @namespace events */
import { combineReducers } from 'redux'
import { makeEventReducer } from '../../utils/redux/templates/event'

const trackedEvents = makeEventReducer('trackedEvents')

export default combineReducers({
  trackedEvents,
})

export const selectors = {}
