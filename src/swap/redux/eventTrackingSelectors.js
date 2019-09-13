// This file is generated code, edits will be overwritten
import _ from 'lodash'
import { createSelector } from 'reselect'
import constants from '../../constants'

const getFetchedTrackedEvents = state => state.events.trackedEvents.fetched

export const getSwapSwapEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xdb667502ab054fbfc1011315893dab3481c36c50f60b5ad16f1c14e6035e7a9e',
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

export const getSwapAuthorizeEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0x601f80ed402ea845dc33078b21175993b7e0040de344205a8fd656d7033eb724',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)

export const getSwapRevokeEvents = createSelector(getFetchedTrackedEvents, events =>
  _.filter(events, {
    topic: '0xd7426110292f20fe59e73ccf52124e0f5440a756507c91c7b0a6c50e1eb1a23a',
    address: constants.SWAP_CONTRACT_ADDRESS,
  }),
)
