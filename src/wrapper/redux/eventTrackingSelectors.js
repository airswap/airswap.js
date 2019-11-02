// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getWrapperOwnershipTransferredEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
    address: constants.WRAPPER_CONTRACT_ADDRESS,
  }),
)
