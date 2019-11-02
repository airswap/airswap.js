// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getSwapAuthorizeSenderEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xbe9299809b40c2eeb1ae326da30a511c24d70cbe3cd4ff384e4839b91de3b325',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapAuthorizeSignerEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xb9bdd0621c52f9a047fe2a048fa04cdf987438d068ac524be8ea382aa3e94d2c',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapCancelEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x8dd3c361eb2366ff27c2db0eb07b9261f1d052570742ab8c9a0c326f37aa576d',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapInvalidateEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x13271a4112377cb8d98566817cc69dc66ed3ee25fdcea309a9f6696475640b78',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapRevokeSenderEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x92b544a2f54114da47550f9ee5b45cc343e5db8bfd148a7aba43219e33fceccd',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapRevokeSignerEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xfe558292b85125b7cf178f3456b09ce2fa79ca4b4fe2d7bb5da670ffecdb765e',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapSwapEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)
