require('dotenv').config()
const assert = require('assert')
const contractFunctions = require('./contractFunctions')
const constants = require('../constants')
const getSigner = require('../wallet/getSigner')

describe('Indexer Tests', async () => {
  it('Test getIndexerIndexes()', async () => {
    const response = await contractFunctions.getIndexerIndexes(
      '0xc778417e063141139fce010982780140aa0cd5ab',
      '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
      constants.PROTOCOL_1,
    )
    assert.equal(response, '0x5d3cCA880fc44A83dF0f3B1c0B0eF5470bF09EFf')
  })

  it('Test getIndexerIsOwner()', async () => {
    const response = await contractFunctions.getIndexerIsOwner()
    assert.equal(response, true)
  })

  it('Test getIndexerOnwer()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x7F18BB4Dd92CF2404C54CBa1A9BE4A1153bdb078')
  })

  it('Test submitIndexerTransferOwnership()', async () => {
    const signer = getSigner({ privateKey: process.env.PRIVATE_KEY })
    const response = await contractFunctions.submitIndexerTransferOwnership(
      '0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE',
      signer,
    )
    assert.equal(response, true)
  })
})
