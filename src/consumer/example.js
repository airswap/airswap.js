const { mapNested20QuoteTo22Quote } = require('../swap/utils')
const Router = require('../protocolMessaging')
const Indexer = require('../indexer')
const { AST_CONTRACT_ADDRESS, WETH_CONTRACT_ADDRESS } = require('../constants')

const indexer = new Indexer()

const router = new Router({
  supportLegacy: false,
  address: '0xddc2aade47c619e902b79619346d3682089b2d63',
})

async function queryHttpIntents(query) {
  await indexer.ready
  const intents = indexer.getIntents()

  const filteredIntents = intents.filter(
    i => i.senderToken === query.senderToken && i.signerToken === query.signerToken,
  )

  const promiseResults = filteredIntents.map(async intent => {
    const { senderToken, signerToken, swapVersion, locator, locatorType } = intent

    let maxQuote
    try {
      maxQuote = mapNested20QuoteTo22Quote(
        await router.getMaxQuote(intent.makerAddress, {
          senderToken,
          signerToken,
          swapVersion,
          locator,
          locatorType,
        }),
      )
    } catch (e) {
      return { error: e, intent, type: 'getMaxQuote' }
    }

    const requestAmount = '10000' // 1 AST

    let quote
    try {
      quote = mapNested20QuoteTo22Quote(
        await router.getSenderSideOrder(intent.makerAddress, {
          senderToken,
          signerToken,
          signerAmount: requestAmount,
          swapVersion,
          locator,
          locatorType,
        }),
      )
    } catch (e) {
      return { error: e, intent, type: 'getSignerSideQuote' }
    }

    let order
    try {
      order = mapNested20QuoteTo22Quote(
        await router.getSenderSideOrder(intent.makerAddress, {
          senderToken,
          signerToken,
          signerAmount: requestAmount,
          swapVersion,
          locator,
          locatorType,
        }),
      )
    } catch (e) {
      return { error: e, intent, type: 'getOrder' }
    }

    return { intent, maxQuote, quote, order }
  })
  return Promise.all(promiseResults)
}

const query = {
  signerToken: AST_CONTRACT_ADDRESS,
  senderToken: WETH_CONTRACT_ADDRESS,
}

queryHttpIntents(query).then(results => console.log(JSON.stringify(results, null, 2)))
