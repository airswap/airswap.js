import _ from 'lodash'
import { createSelector } from 'reselect'
import { getIndexerGetLocators, getIndexerIndexes } from './callDataSelectors'
import { getIndexSetLocatorEvents } from '../../index/redux/eventTrackingSelectors'
import { mapOnChainIntentToOffChain, parseLocatorAndLocatorType } from '../utils'

// TODO: this selector is a work in progress, currently being replaced by the selector below which is event driven instead of callData driven
const getLocators = createSelector(getIndexerGetLocators, responses =>
  responses.map(r => {
    const {
      parameters: { senderToken, signerToken },
      response, //eslint-disable-line
    } = r
    const [, ...rest] = r.split(',').reverse()
    const length = rest.length / 2
    rest.slice(0, length).map(locator => ({
      senderToken,
      signerToken,
      ...locator,
    }))
  }),
)

const getLocatorIntents = createSelector(
  getIndexSetLocatorEvents,
  getIndexerIndexes,
  (setLocatorEvents, indexesResponse) => {
    const parsedEvents = setLocatorEvents.map(event => {
      const {
        values: { identifier, locator, score },
        address,
      } = event

      const indexMap = _.find(indexesResponse, r => r.response.toLowerCase() === address.toLowerCase())
      if (!indexMap) {
        return null
      }
      const { senderToken, signerToken } = _.get(indexMap, 'parameters', {})

      if (!(senderToken && signerToken)) {
        return null
      }

      return {
        senderToken,
        signerToken,
        index: address,
        identifier,
        ...parseLocatorAndLocatorType(locator),
        score,
      }
    })
    return _.sortBy(_.compact(parsedEvents), 'score').reverse()
  },
)

const getLocatorIntentsFormatted = createSelector(getLocatorIntents, intents => intents.map(mapOnChainIntentToOffChain))

export { getLocators, getLocatorIntents, getLocatorIntentsFormatted }
