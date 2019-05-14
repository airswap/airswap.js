import _ from 'lodash'

const ethers = require('ethers')
const { approveToken, checkApproval } = require('../erc20')
const tokenMetadata = require('../tokens/index')
const bn = require('bignumber.js')
const {
  RESERVE_CONTRACT_ABI,
  RESERVE_CONTRACT_BYTECODE,
  RESERVE_CONTRACT_DEPLOYED_BYTECODE,
  EXCHANGE_CONTRACT_ADDRESS,
  AST_CONTRACT_ADDRESS,
  DINDEXER_ADDRESS,
  abis,
} = require('../constants')

const gasPrice = ethers.utils.bigNumberify('10000000000') // 6 gwei
const gasLimit = ethers.utils.hexlify(1000000)

const { findDeployedContractsForSender } = require('../utils/contractAddresses')

async function deployReserve(signer) {
  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(RESERVE_CONTRACT_ABI, RESERVE_CONTRACT_BYTECODE, signer)
  const deploy = await factory.deploy(EXCHANGE_CONTRACT_ADDRESS, AST_CONTRACT_ADDRESS)

  return deploy.deployTransaction
}

async function findReserves(signer) {
  const address = await signer.getAddress()
  return findDeployedContractsForSender(address, RESERVE_CONTRACT_DEPLOYED_BYTECODE)
}

function getReserveContractInterface(reserveContractAddress, signer) {
  window.ethers = ethers
  window.signer = signer
  window.reserveABI = RESERVE_CONTRACT_ABI
  return new ethers.Contract(reserveContractAddress, RESERVE_CONTRACT_ABI, signer)
}

async function getNumLimitOrders(reserveContractAddress, signer) {
  const reserveContract = getReserveContractInterface(reserveContractAddress, signer)
  return reserveContract.getNumLimitOrders()
}

async function getLimitOrders(reserveContractAddress, signer) {
  const reserveContract = getReserveContractInterface(reserveContractAddress, signer)
  const numLimitOrders = await getNumLimitOrders(reserveContractAddress, signer)
  return Promise.all(
    _.range(numLimitOrders).map(async orderId => {
      const order = await reserveContract.limitOrders(orderId)
      const { depositToken, returnToken, c, e, depositAmount } = _.mapValues(order, o =>
        (o.toString ? o.toString() : o).toLowerCase(),
      )

      return getReadableLimitOrder({ depositToken, returnToken, c, e, depositAmount, orderId })
    }),
  )
}

async function getReadableLimitOrder({ depositToken, returnToken, c, e, depositAmount, orderId }) {
  await tokenMetadata.ready
  const fullOrder = {
    depositToken,
    depositSymbol: tokenMetadata.tokenSymbolsByAddress[depositToken],
    returnToken,
    returnSymbol: tokenMetadata.tokenSymbolsByAddress[returnToken],
    c,
    e,
    depositAmount,
    orderId,
    ...(await getFormattedAmountsFromContractPrice(depositToken, returnToken, c, e, depositAmount)),
  }

  return fullOrder
}

async function getAtomicPriceFromDisplayPrice(depositToken, returnToken, depositAmountDisplayValue, priceDisplayValue) {
  await tokenMetadata.ready
  let returnAmountDisplayValue
  if (tokenMetadata.isBaseAsset(depositToken, [depositToken, returnToken])) {
    returnAmountDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: returnToken },
      Number(depositAmountDisplayValue) / Number(priceDisplayValue),
    )
  } else if (tokenMetadata.isBaseAsset(returnToken, [depositToken, returnToken])) {
    returnAmountDisplayValue = tokenMetadata.formatSignificantDigitsByToken(
      { address: returnToken },
      Number(depositAmountDisplayValue) * Number(priceDisplayValue),
    )
  } else {
    throw new Error('unable to calculate baseAsset')
  }

  const depositAmountAtomic = tokenMetadata.formatAtomicValueByToken(
    { address: depositToken },
    depositAmountDisplayValue,
  )
  const returnAmountAtomic = tokenMetadata.formatAtomicValueByToken(
    //eslint-disable-line
    { address: returnToken },
    returnAmountDisplayValue,
  )
  const priceAtomic = bn(depositAmountAtomic).div(returnAmountAtomic)
  return priceAtomic.toString()
}

async function getContractPriceFromDisplayPrice(
  depositToken,
  returnToken,
  depositAmountDisplayValue,
  priceDisplayValue,
) {
  const atomicPrice = await getAtomicPriceFromDisplayPrice(
    depositToken,
    returnToken,
    depositAmountDisplayValue,
    priceDisplayValue,
  )

  const [int, decimalVal] = atomicPrice.split('.') // eslint-disable-line'
  const decimal = decimalVal || ''
  let e
  if (decimal === '') {
    e = 0
  } else {
    e = decimal.length
  }
  const c = `${int}${decimal}`
  // check
  const priceCheck = bn(c)
    .times(bn(10).pow(-e))
    .toString()
  console.log(atomicPrice, priceCheck)
  if (atomicPrice === priceCheck) {
    // if calulation checks out, return values

    return { c, e: String(e) }
  }
  throw new Error('error calculating contract price')
}

async function getFormattedAmountsFromContractPrice(depositToken, returnToken, c, e, depositAmountAtomic) {
  await tokenMetadata.ready
  const atomicPrice = bn(c)
    .times(bn(10).pow(-Number(e)))
    .toString()

  const returnAmountAtomic = bn(depositAmountAtomic).div(atomicPrice)
  const returnAmountFormatted = tokenMetadata.formatDisplayValueByToken({ address: returnToken }, returnAmountAtomic)
  const depositAmountFormatted = tokenMetadata.formatDisplayValueByToken({ address: depositToken }, depositAmountAtomic)
  const depositSymbol = tokenMetadata.tokenSymbolsByAddress[depositToken]
  const returnSymbol = tokenMetadata.tokenSymbolsByAddress[returnToken]
  let priceAmount
  let pricePair
  if (tokenMetadata.isBaseAsset(depositToken, [depositToken, returnToken])) {
    priceAmount = tokenMetadata.formatSignificantDigitsByToken(
      { address: returnToken },
      Number(depositAmountFormatted) / Number(returnAmountFormatted),
    )
    pricePair = `${returnSymbol}/${depositSymbol}`
  } else if (tokenMetadata.isBaseAsset(returnToken, [depositToken, returnToken])) {
    priceAmount = tokenMetadata.formatSignificantDigitsByToken(
      { address: returnToken },
      Number(returnAmountFormatted) * Number(depositAmountFormatted),
    )
    pricePair = `${depositSymbol}/${returnSymbol}`
  }

  return { depositAmount: returnAmountAtomic, returnAmountFormatted, depositAmountFormatted, priceAmount, pricePair }
}

async function submitReserveLimitOrder(order, reserveAddress, signer) {
  try {
    // SET UP

    await tokenMetadata.ready
    const { ETH } = tokenMetadata.tokenAddressesBySymbol

    const reserveContract = getReserveContractInterface(reserveAddress, signer)
    const { depositAmount: depositAmountDisplayValue, price: priceDisplayValue, depositToken, returnToken } = order
    const depositAmountAtomic = tokenMetadata.formatAtomicValueByToken(
      { address: depositToken },
      depositAmountDisplayValue,
    )
    // CHECK APPROVAL
    if (depositToken !== ETH) {
      const approved = await checkApproval(depositToken, reserveAddress, signer)
      console.log(reserveAddress, approved ? 'approved' : 'not approved, approving')
      if (!approved) {
        const resp = await approveToken(depositToken, reserveAddress, signer)
        console.log('submitted approval', resp)
        const tx = await resp.wait()
        console.log('approval mined', tx)
      }
    }

    console.log('submitting limit order')
    const { c, e } = await getContractPriceFromDisplayPrice(
      depositToken,
      returnToken,
      depositAmountDisplayValue,
      priceDisplayValue,
    )
    console.log(
      depositToken,
      returnToken,
      c,
      e,
      depositAmountAtomic,
      ethers.utils.bigNumberify(depositToken === ETH ? depositAmountAtomic : 0).toString(),
    )

    const amount = ethers.utils.bigNumberify(depositAmountAtomic)
    return reserveContract.depositLiquidity(depositToken, returnToken, c, e, amount, {
      gasLimit,
      gasPrice,
      value: depositToken === ETH ? amount : 0,
    })
  } catch (e) {
    console.log(e)
  }
}

async function cancelReserveLimitOrder(orderId, reserveAddress, signer) {
  // SET UP
  await tokenMetadata.ready
  const reserveContract = getReserveContractInterface(reserveAddress, signer)

  return reserveContract.cancel(orderId, {
    gasLimit,
    gasPrice,
  })
}

function getDIndexerContractInterface(signer) {
  window.ethers = ethers
  window.signer = signer
  window.reserveABI = RESERVE_CONTRACT_ABI
  return new ethers.Contract(DINDEXER_ADDRESS, abis[DINDEXER_ADDRESS], signer)
}

async function addDIndexerIntent(reserveAddress, signer) {
  // SET UP
  const dIndexerContract = getDIndexerContractInterface(signer)

  return dIndexerContract.addIntent(reserveAddress, {
    gasLimit,
    gasPrice,
  })
}

async function removeDIndexerIntent(reserveAddress, signer) {
  // SET UP
  const dIndexerContract = getDIndexerContractInterface(signer)

  return dIndexerContract.removeIntent(reserveAddress, {
    gasLimit,
    gasPrice,
  })
}

async function getDIndexerIntent(reserveAddress, signer) {
  // SET UP
  const dIndexerContract = getDIndexerContractInterface(signer)

  return dIndexerContract.getIntent(reserveAddress)
}

async function findDIndexerIntent(depositToken, returnToken, signer) {
  // SET UP
  const dIndexerContract = getDIndexerContractInterface(signer)

  return dIndexerContract.findIntent(depositToken, returnToken)
}

export {
  deployReserve,
  findReserves,
  getLimitOrders,
  getReserveContractInterface,
  getContractPriceFromDisplayPrice,
  submitReserveLimitOrder,
  cancelReserveLimitOrder,
  addDIndexerIntent,
  removeDIndexerIntent,
  getDIndexerIntent,
  findDIndexerIntent,
}
