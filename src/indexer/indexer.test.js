require('dotenv').config()
const assert = require('assert')
const contractFunctions = require('./contractFunctions')
const constants = require('../constants')
const getSigner = require('../wallet/getSigner')

describe('Indexer Tests', async () => {
  it('Test getIndexerIndexes()', async () => {
    const response = await contractFunctions.getIndexerIndexes(
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      constants.PROTOCOL_0,
    )
    assert.equal(response, '0xc712741B7f7C055A07fa4e93dC62F82994eC0D1c')
  })

  it('Test getIndexerIsOwner()', async () => {
    const response = await contractFunctions.getIndexerIsOwner()
    assert.equal(response, true)
  })

  it('Test getIndexerOwner()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x7eeAb4F134fcFA6FCAF3987D391f1d626f75F6E1')
  })

  it('Test submitIndexerTransferOwnership()', async () => {
    const walletActions = {
      startWalletAction: () => ({
        gasLimit: 300000,
        gasPrice: 1,
      }),
    }
    const signer = getSigner({ privateKey: process.env.PRIVATE_KEY }, walletActions)
    await contractFunctions.submitIndexerTransferOwnership('0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE', signer)
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE')
  })
})
