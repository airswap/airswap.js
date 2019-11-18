const { getContractPriceFromDisplayPrice, getDisplayPriceFromContractPrice } = require('./utils')

async function test(inputPrice) {
  console.log('Original Display Price', JSON.stringify(inputPrice, null, 2))
  const contractPrice = await getContractPriceFromDisplayPrice(inputPrice)
  console.log('Contract Price', JSON.stringify(contractPrice, null, 2))
  const displayPrice = await getDisplayPriceFromContractPrice(contractPrice)
  console.log('Display Price Derived From Contract Rule', JSON.stringify(displayPrice, null, 2))
}

test({
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountDisplayValue: '1000',
  priceDisplayValue: '0.001',
})

test({
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  senderAmountDisplayValue: '1000',
  priceDisplayValue: '0.001',
})

test({
  senderToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  signerToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  senderAmountDisplayValue: '654.321',
  priceDisplayValue: '123.4562',
})

test({
  senderToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  signerToken: '0x27054b13b1b798b345b591a4d22e6562d47ea75a',
  senderAmountDisplayValue: '1234.5678',
  priceDisplayValue: '654.321',
})
