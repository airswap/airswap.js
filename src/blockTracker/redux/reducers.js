import { createSelector } from 'reselect'
import _ from 'lodash'

const oldestBlockLimit = 50000

function withoutTransactions({ number, timestamp }) {
  return { number, timestamp }
}

function blocks(state = {}, action) {
  switch (action.type) {
    case 'GOT_LATEST_BLOCK':
      return _.pickBy(
        {
          ...state,
          [action.block.number]: withoutTransactions(action.block),
        },
        block => block.number > action.block.number - oldestBlockLimit,
      )
    case 'GOT_BLOCK':
      return {
        ...state,
        [action.block.number]: withoutTransactions(action.block),
      }
    case 'GOT_BLOCKS':
      const blockNumbers = _.map(action.blocks, 'number')
      return {
        ...state,
        ..._.zipObject(blockNumbers, action.blocks.map(withoutTransactions)),
      }
    default:
      return state
  }
}

export default blocks
// combineReducers({
//   blocks,
// })

const getBlocks = state => state.blockTracker
const getBlockNumbers = createSelector(getBlocks, b => _.map(_.values(b), 'number'))
const getLatestBlock = createSelector(getBlocks, blocksObj => _.last(_.sortBy(_.values(blocksObj), 'number')))

export const selectors = {
  getBlocks,
  getBlockNumbers,
  getLatestBlock,
}
