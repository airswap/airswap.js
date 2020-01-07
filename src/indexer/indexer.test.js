import * as contractFunctions from './contractFunctions'

describe('Indexer Tests', async () => {
  it('Test getIndexerIsOwner()', async () => {
    console.log('hello')
    const response = await contractFunctions.getIndexerIsOwner()
    console.log(response)
  })

  it('Test getIndexerOnwer()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    console.log(response)
  })
})
