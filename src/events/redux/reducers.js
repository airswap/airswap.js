/** @namespace events */
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { makeEventReducer, makeEventSelectors } from '../../utils/redux/templates/event'

const makeEventId = ({ name, namespace }) => `${namespace}${name}`

const fetchingHistorical = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_HISTORICAL_EVENTS':
      return {
        ...state,
        [makeEventId(action)]: true,
      }
    case 'FETCHED_HISTORICAL_EVENTS':
      return {
        ...state,
        [makeEventId(action)]: false,
      }
    default:
      return state
  }
}

const fetchedHistorical = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHED_HISTORICAL_EVENTS':
      return {
        ...state,
        [makeEventId(action)]: true,
      }
    default:
      return state
  }
}

const trackedEvents = makeEventReducer('trackedEvents')

export default combineReducers({
  trackedEvents,
  fetchingHistorical,
  fetchedHistorical,
})

export const { getFetchedTrackedEvents } = makeEventSelectors('trackedEvents', 'events')
export const getEvents = state => state.events
export const getFetchingHistoricalEvents = createSelector(getEvents, events => events.fetchingHistorical)
export const getFetchedHistoricalEvents = createSelector(getEvents, events => events.fetchedHistorical)

export const selectors = { getFetchedTrackedEvents, getFetchingHistoricalEvents, getFetchedHistoricalEvents }
