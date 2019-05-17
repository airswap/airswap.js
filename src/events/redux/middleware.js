import _ from 'lodash'
import * as ethers from 'ethers'
import { abis, SWAP_LEGACY_CONTRACT_ADDRESS, AIRSWAP_GETH_NODE_ADDRESS } from '../../constants'
import { makeMiddlewareEventFn, makeEventActionTypes } from '../../utils/redux/templates/event'
import { selectors } from './reducers'
import * as gethRead from '../../utils/gethRead'

const exchangeABI = abis[SWAP_LEGACY_CONTRACT_ADDRESS]
const abiInterface = new ethers.utils.Interface(exchangeABI)
const { topic } = abiInterface.events.Filled

const provider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

// not currently in use
// const gotBlock = block => ({
//   type: 'GOT_BLOCK',
//   block,
// })

const gotBlocks = blocks => ({
  type: 'GOT_BLOCKS',
  blocks,
})

export default function eventsMiddleware(store) {
  provider.getBlockNumber().then(block => {
    const params = {
      contractAddress: SWAP_LEGACY_CONTRACT_ADDRESS,
      abi: exchangeABI,
      topic,
      fromBlock: block - 7000, // 24 hour volume is a subset of these blocks, filtered in reducer selectors
    }
    makeMiddlewareEventFn(params, 'exchangeFills', store)
  })

  //   const erc20Params = {
  //     contractAddress: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
  //     abi: ERC20ABI,
  //     topic: transferTopic,
  //     fromBlock: block,
  //   }
  //   makeMiddlewareEventFn(erc20Params, 'erc20Transfers', store)

  return next => action => {
    switch (action.type) {
      case makeEventActionTypes('exchangeFills').got:
        const fetchedBlockNumbers = selectors.getBlockNumbers(store.getState())
        const eventBlockNumbers = _.get(action, 'response', []).map(({ blockNumber }) => blockNumber)
        const blockPromises = _.without(eventBlockNumbers, ...fetchedBlockNumbers).map(async blockNumber =>
          gethRead.fetchBlock(blockNumber),
        )
        Promise.all(blockPromises).then(blocks => {
          const formattedBlocks = blocks.map(block => ({
            ...block,
            timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
            number: ethers.utils.bigNumberify(block.number).toNumber(),
          }))
          store.dispatch(gotBlocks(formattedBlocks))
        })

        break
      default:
    }
    return next(action)
  }
}
