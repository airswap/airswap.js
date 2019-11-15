// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getDelegateFactoryCreateDelegateEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xff8beab89e8c26a642d622a3afc4cddcb2f06b35a39b280a98b1f7a465080115',
    address: constants.DELEGATE_FACTORY_CONTRACT_ADDRESS,
  }),
)
