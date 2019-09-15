const _ = require('lodash')
const { fetchBlock, fetchCurrentBlockNumber } = require('../utils/gethRead')

class BlockTracker {
  constructor(interval = 3000) {
    this.interval = interval
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
  async pollForNextBlock() {
    const currentBlockNumber = this.getLatestBlockNumber()
    let latestBlock
    let latestBlockNumber
    try {
      latestBlockNumber = await fetchCurrentBlockNumber()
      if (latestBlockNumber > currentBlockNumber) {
        latestBlock = await fetchBlock(latestBlockNumber)
        this.blocks[latestBlock.number] = latestBlock
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

module.exports = new BlockTracker()
