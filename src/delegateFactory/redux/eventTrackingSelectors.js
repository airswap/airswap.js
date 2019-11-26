// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'
import {
  getFetchedTrackedEvents,
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
} from '../../events/redux/reducers'

export const getDelegateFactoryCreateDelegateEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xff8beab89e8c26a642d622a3afc4cddcb2f06b35a39b280a98b1f7a465080115',
    address: constants.DELEGATE_FACTORY_CONTRACT_ADDRESS,
  }),
)

export const getDelegateFactoryCreateDelegateHistoricalFetchStatus = createSelector(
  getFetchingHistoricalEvents,
  getFetchedHistoricalEvents,
  (fetchingValues, fetchedValues) => {
    const fetching = fetchingValues.delegateFactoryCreateDelegate
    const fetched = fetchedValues.delegateFactoryCreateDelegate
    return {
      fetching,
      fetched,
    }
  },
)
