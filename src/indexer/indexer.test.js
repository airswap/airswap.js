require('dotenv').config()
const assert = require('assert')
const contractFunctions = require('./contractFunctions')
const constants = require('../constants')
const getSigner = require('../wallet/getSigner')

const walletActions = {
  startWalletAction: () => ({
    gasPrice: 10000000000,
  }),
}
const signer = getSigner({ privateKey: process.env.PRIVATE_KEY }, walletActions)

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

  it('Test getIndexerLocatorWhitelists()', async () => {
    let response
    response = await contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_0)
    assert.equal(response, '0x0000000000000000000000000000000000000000')
    response = await contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_1)
    assert.equal(response, '0x0000000000000000000000000000000000000000')
    response = await contractFunctions.getIndexerLocatorWhitelists(constants.PROTOCOL_2)
    assert.equal(response, '0x0000000000000000000000000000000000000000')
  })

  it('Test getIndexerOwner()', async () => {
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x7eeAb4F134fcFA6FCAF3987D391f1d626f75F6E1')
  })

  it.skip('Test submitIndexerRenounceOwnership()', async () => {
    await contractFunctions.submitIndexerRenounceOwnership(signer)
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x0000000000000000000000000000000000000000')
  })

  it('Test getIndexerStakingToken()', async () => {
    const response = await contractFunctions.getIndexerStakingToken()
    assert.equal(response, '0x27054b13b1B798B345b591a4d22e6562d47eA75a')
  })

  it('Test getIndexerTokenBlacklist()', async () => {
    const response_dai = await contractFunctions.getIndexerTokenBlacklist('0x6b175474e89094c44da98b954eedeac495271d0f')
    assert.equal(response_dai, false)
    const response_weth = await contractFunctions.getIndexerTokenBlacklist('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')
    assert.equal(response_weth, false)
  })

  it.skip('Test submitIndexerTransferOwnership()', async () => {
    await contractFunctions.submitIndexerTransferOwnership('0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE', signer)
    const response = await contractFunctions.getIndexerOwner()
    assert.equal(response, '0x02C2F3a87D503f0f6ad7D99E89fE09B8d6e533bE')
  })

  it.skip('Test submitIndexerSetLocatorWhitelist()', async () => {})

  it('Test submitIndexerCreateIndex()', async () => {
    await contractFunctions.submitIndexerCreateIndex(
      '0x64c86899bc02dd9af823b131e5acd4369f72bd39',
      '0x5c508f6bdcde0c809a28fa58e61e280500da4677',
      constants.PROTOCOL_0,
      signer,
    )
    const response = await contractFunctions.getIndexerIndexes(
      '0x64c86899bc02dd9af823b131e5acd4369f72bd39',
      '0x5c508f6bdcde0c809a28fa58e61e280500da4677',
      constants.PROTOCOL_0,
    )
    // should always hash to the following
    assert.notEqual(response, '0x06d2FEBDeCa66845687c093964f96845A2B53f8D')
  })
})
