const { flatten, mapNested20QuoteTo22Quote } = require('../swap/utils')
const Router = require('../protocolMessaging')
const Indexer = require('../indexer')

const indexer = new Indexer()

const router = new Router({
  supportLegacy: false,
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
      maxQuote = flatten(
        mapNested20QuoteTo22Quote(
          await router.getMaxQuote(intent.makerAddress, {
            senderToken,
            signerToken,
            swapVersion,
            locator,
            locatorType,
          }),
        ),
      )
    } catch (e) {
      return { error: e, intent, type: 'getMaxQuote' }
    }

    const requestAmount = maxQuote.senderAmount

    let quote
    try {
      quote = flatten(
        mapNested20QuoteTo22Quote(
          await router.getSignerSideQuote(intent.makerAddress, {
            senderToken,
            signerToken,
            senderAmount: requestAmount,
            swapVersion,
            locator,
            locatorType,
          }),
        ),
      )
    } catch (e) {
      return { error: e, intent, type: 'getSignerSideQuote' }
    }

    let order
    try {
      order = flatten(
        mapNested20QuoteTo22Quote(
          await router.getSignerSideOrder(intent.makerAddress, {
            senderToken,
            signerToken,
            senderAmount: requestAmount,
            swapVersion,
            locator,
            locatorType,
          }),
        ),
      )
    } catch (e) {
      return { error: e, intent, type: 'getOrder' }
    }

    return { intent, maxQuote, quote, order }
  })
  return Promise.all(promiseResults)
}

const query = {
  signerToken: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
  senderToken: '0xc778417e063141139fce010982780140aa0cd5ab',
}

queryHttpIntents(query).then(results => console.log(results.filter(result => !result.error)))
