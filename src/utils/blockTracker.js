const _ = require('lodash')
const { fetchBlock, fetchLatestBlock } = require('./gethRead')

class BlockTracker {
  constructor(onBlock, interval = 3000) {
    this.interval = interval
    this.onBlock = onBlock || _.identity
    this.blocks = {}
    this.init()
  }
  async init() {
    const block = await fetchLatestBlock(true)
    this.blocks[block.number] = block
    this.onBlock(block)
    this.pollForNextBlock()
  }
  getSortedBlocks() {
    return _.sortBy(_.values(this.blocks), 'number')
  }
  async pollForNextBlock() {
    const currentBlockNumber = _.get(_.last(this.getSortedBlocks()), 'number')
    let block
    try {
      block = await fetchBlock(currentBlockNumber + 1)
      if (block) {
        this.blocks[block.number] = block
        this.onBlock(block)
      }
    } catch (e) {
      console.log(`didnt get block (threw error) ${currentBlockNumber}`, e)
    }
    setTimeout(this.pollForNextBlock.bind(this), this.interval)
  }
}

module.exports = BlockTracker
