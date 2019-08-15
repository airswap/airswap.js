const _ = require('lodash')
const { fetchBlock, fetchLatestBlock } = require('../utils/gethRead')

class BlockTracker {
  constructor(interval = 3000) {
    this.interval = interval
    this.blocks = {}
    this.blockProcessors = []
    this.readyPromise = this.init()
  }
  async init() {
    const block = await fetchLatestBlock(true)
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
  async pollForNextBlock() {
    const currentBlockNumber = this.getLatestBlockNumber()
    let block
    try {
      block = await fetchBlock(currentBlockNumber + 1)
      if (block) {
        this.blocks[block.number] = block
        this.blockProcessors.map(processNewBlock => processNewBlock(block))
      }
    } catch (e) {
      console.log(`didnt get block (threw error) ${currentBlockNumber}`, e)
    }
    setTimeout(this.pollForNextBlock.bind(this), this.interval)
  }
}

module.exports = new BlockTracker()
