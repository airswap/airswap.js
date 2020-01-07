const assert = require('assert')
const contractFunctions = require('./contractFunctions')
const constants = require('../constants')

describe('Indexer Tests', async () => {
  it('Test getIndexerIndexes()', async () => {
    const response = await contractFunctions.getIndexerIndexes(
      constants.DAI_CONTRACT_ADDRESS,
      constants.WETH_CONTRACT_ADDRESS,
      constants.PROTOCOL_1,
    )
    // assert equal(response, '')
    console.log(response)
  })

  it('Test getIndexerIsOwner()', async () => {
    const response = await contractFunctions.getIndexerIsOwner()
    assert.equal(response, true)
  })

  it('Test getIndexerOnwer()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x7F18BB4Dd92CF2404C54CBa1A9BE4A1153bdb078')
  })
})
