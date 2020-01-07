const assert = require('assert')
const contractFunctions = require('./contractFunctions')

describe('Indexer Tests', async () => {
  it('Test getIndexerIsOwner()', async () => {
    const response = await contractFunctions.getIndexerIsOwner()
    assert.equal(response, true)
  })

  it('Test getIndexerOnwer()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x7F18BB4Dd92CF2404C54CBa1A9BE4A1153bdb078')
  })
})
