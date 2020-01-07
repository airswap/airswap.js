const contractFunctions = require('./contractFunctions')

describe('Indexer Tests', async () => {
  it('Test getIndexerIsOwner()', async () => {
    const response = await contractFunctions.getIndexerIsOwner()
    console.log(response)
  })

  it('Test getIndexerOnwer()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    console.log(response)
  })
})
