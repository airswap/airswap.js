import _ from 'lodash'
import * as ethers from 'ethers'
import { abis, SWAP_LEGACY_CONTRACT_ADDRESS, ERC20abi } from '../../constants'
import { makeEventActionTypes, makeEventFetchingActionsCreators } from '../../utils/redux/templates/event'
import { selectors as blockTrackerSelectors } from '../../blockTracker/redux'
import { selectors as apiSelectors } from '../../api/redux'
import { selectors as eventSelectors } from './reducers'

import * as gethRead from '../../utils/gethRead'
import { buildGlobalERC20TransfersTopics, fetchLogs } from '../index'
import { gotBlocks } from '../../blockTracker/redux/actions'

const exchangeABI = abis[SWAP_LEGACY_CONTRACT_ADDRESS]
const abiInterface = new ethers.utils.Interface(exchangeABI)

const initPollExchangeFills = _.once(store => {
  const state = store.getState()
  const block = blockTrackerSelectors.getLatestBlock(state)
  fetchLogs(
    SWAP_LEGACY_CONTRACT_ADDRESS,
    exchangeABI,
    abiInterface.events.Filled.topic,
    block.number - 7000, // 7000 is to include 24 hours worth of transactions, extra is included to cover variable block times (currently around 5000 transactions per day)
    block.number,
  ).then(logs => {
    store.dispatch(makeEventFetchingActionsCreators('exchangeFills').got(logs))
  })
})

const pollERC20Transfers = (store, block) => {
  const state = store.getState()
  const addresses = apiSelectors.getTrackedAddresses(state)
  if (!addresses.length) {
    return null
  }
  const { fromTopics, toTopics } = buildGlobalERC20TransfersTopics(addresses)

  Promise.all([
    fetchLogs(null, ERC20abi, fromTopics, block.number - 1, block.number), // might sometimes fetch balances twice, but better than missing an update
    fetchLogs(null, ERC20abi, toTopics, block.number - 1, block.number),
  ]).then(([fromLogs, toLogs]) => {
    const logs = [...fromLogs, ...toLogs]
    if (logs && logs.length) {
      store.dispatch(makeEventFetchingActionsCreators('erc20Transfers').got(logs))
    }
  })
}

export default function eventsMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case makeEventActionTypes('exchangeFills').got:
        const fetchedBlockNumbers = blockTrackerSelectors.getBlockNumbers(store.getState())
        const eventBlockNumbers = _.get(action, 'response', []).map(({ blockNumber }) => blockNumber)
        const blockPromises = _.without(eventBlockNumbers, ...fetchedBlockNumbers).map(async blockNumber =>
          gethRead.fetchBlock(blockNumber),
        )

        Promise.all(blockPromises).then(blocks => {
          if (blocks.length) {
            store.dispatch(gotBlocks(blocks))
          }
        })
        break
      case 'GOT_LATEST_BLOCK':
        // check for new airswap fills on each new block
        fetchLogs(
          SWAP_LEGACY_CONTRACT_ADDRESS,
          exchangeABI,
          abiInterface.events.Filled.topic,
          action.block.number - 1,
          action.block.number,
        ).then(logs => {
          const fillsTxIds = _.map(eventSelectors.getFetchedExchangeFills(store.getState()), 'transactionHash')
          const newFills = _.filter(logs, ({ transactionHash }) => !_.includes(fillsTxIds, transactionHash))
          if (logs && logs.length) {
            store.dispatch(makeEventFetchingActionsCreators('exchangeFills').got(newFills))
          }
        })
        // check for erc20 transfers on each new block
        pollERC20Transfers(store, action.block)
        break
      default:
    }
    next(action)
    if (action.type === 'GOT_LATEST_BLOCK') {
      // needs to initialize after next(action) is called to have access to the latest state
      initPollExchangeFills(store) // only executes once since it is wrapped in _.once
    }
  }
}
