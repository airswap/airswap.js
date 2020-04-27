const { NO_ALCHEMY_WEBSOCKETS, web3Provider } = require('../constants')
const _ = require('lodash')
const { fetchBlock, fetchCurrentBlockNumber } = require('../utils/gethRead')

class AlchemyWebsocketBlockTracker {
  constructor(blockMemoryLimit = 100) {
    this.blockMemoryLimit = blockMemoryLimit
    this.blocks = {}
    this.blockHeaders = {}
    this.blockProcessors = []
    this.readyPromise = this.init()
  }
  init() {
    return new Promise(resolve =>
      web3Provider.eth.subscribe('newBlockHeaders', {}, async (error, blockHeader) => {
        this.blockHeaders[blockHeader.number] = blockHeader
        const block = await fetchBlock(blockHeader.number)
        this.blocks[block.number] = block
        this.blockProcessors.map(processNewBlock => processNewBlock(block))
        this.manageBlockMemory()
        resolve(true)
      }),
    )
  }
  manageBlockMemory() {
    const oldestBlockNumber = this.getOldestBlockNumber()
    if (Object.keys(this.blocks).length > this.blockMemoryLimit) {
      delete this.blocks[oldestBlockNumber]
    }
  }
  async onBlock(processNewBlock) {
    await this.readyPromise
    processNewBlock(this.getLatestBlock())
    this.blockProcessors.push(processNewBlock)
  }
  async onBlockHeader(processNewBlock) {
    await this.readyPromise
    processNewBlock(this.getLatestBlock())
    this.blockProcessors.push(processNewBlock)
  }
  getSortedBlocks() {
    return _.sortBy(_.values(this.blocks), 'number')
  }
  getLatestBlock() {
    return _.last(this.getSortedBlocks())
  }
  getLatestBlockNumber() {
    return _.get(this.getLatestBlock(), 'number')
  }
  getOldestBlock() {
    return _.head(this.getSortedBlocks())
  }
  getOldestBlockNumber() {
    return _.get(this.getOldestBlock(), 'number')
  }
}

class BlockTracker {
  constructor(interval = 3000, blockMemoryLimit = Number.POSITIVE_INFINITY) {
    this.interval = interval
    this.blockMemoryLimit = blockMemoryLimit
    this.blocks = {}
    this.blockProcessors = []
    this.readyPromise = this.init()
  }
  async init() {
    const blockNumber = await fetchCurrentBlockNumber()
    const block = await fetchBlock(blockNumber)
    this.blocks[block.number] = block
    this.pollForNextBlock()
    return true
  }
  async onBlock(processNewBlock) {
    await this.readyPromise

    processNewBlock(this.getLatestBlock())
    this.blockProcessors.push(processNewBlock)
  }
  getSortedBlocks() {
    return _.sortBy(_.values(this.blocks), 'number')
  }
  getLatestBlock() {
    return _.last(this.getSortedBlocks())
  }
  getLatestBlockNumber() {
    return _.get(this.getLatestBlock(), 'number')
  }
  getOldestBlock() {
    return _.head(this.getSortedBlocks())
  }
  getOldestBlockNumber() {
    return _.get(this.getOldestBlock(), 'number')
  }
  async pollForNextBlock() {
    const currentBlockNumber = this.getLatestBlockNumber()
    const oldestBlockNumber = this.getOldestBlockNumber()
    let latestBlock
    let latestBlockNumber
    try {
      latestBlockNumber = await fetchCurrentBlockNumber()
      if (latestBlockNumber > currentBlockNumber) {
        latestBlock = await fetchBlock(latestBlockNumber)
        this.blocks[latestBlock.number] = latestBlock

        // free up memory if limit is set
        if (Object.keys(this.blocks).length > this.blockMemoryLimit) {
          delete this.blocks[oldestBlockNumber]
        }

        this.blockProcessors.map(processNewBlock => processNewBlock(latestBlock))
        if (latestBlock.number > currentBlockNumber + 1) {
          const range = _.range(currentBlockNumber + 1, latestBlock.number)
          range.map(async n => {
            const missedBlock = await fetchBlock(n)
            this.blocks[missedBlock.number] = missedBlock
            this.blockProcessors.map(processNewBlock => processNewBlock(missedBlock))
          })
        }
      }
    } catch (e) {
      console.log(`didnt get block (threw error) ${currentBlockNumber}`, e)
    }
    setTimeout(this.pollForNextBlock.bind(this), this.interval)
  }
}

module.exports = NO_ALCHEMY_WEBSOCKETS ? new BlockTracker() : new AlchemyWebsocketBlockTracker()
