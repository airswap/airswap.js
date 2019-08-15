/** @namespace events */
import { combineReducers } from 'redux'
import { makeEventReducer, makeEventSelectors } from '../../utils/redux/templates/event'

const trackedEvents = makeEventReducer('trackedEvents')

export default combineReducers({
  trackedEvents,
})

const { getFetchedTrackedEvents } = makeEventSelectors('trackedEvents', 'events')

export const selectors = { getFetchedTrackedEvents }
