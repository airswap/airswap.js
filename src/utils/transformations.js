const { ethers } = require('ethers')
const { abis: constantAbis, SWAP_CONTRACT_ADDRESS, WRAPPER_CONTRACT_ADDRESS } = require('../constants')

const _ = require('lodash')
const BigNumber = require('bignumber.js')

BigNumber.config({ ERRORS: false })
BigNumber.config({ EXPONENTIAL_AT: 1e9 }) //eslint-disable-line

function parseAmount(amount, precision) {
  const num = new BigNumber(Math.max(0, Number(amount)))
  return Number(num.toFixed(precision, BigNumber.ROUND_FLOOR))
}

function formatErrorMessage(error) {
  if (_.isObject(error) && error.message) {
    return error.message.split('\n')[0] // sometimes metamask returns stacktraces and this removes them
  } else if (_.isString(error)) {
    return error
  }
  return ''
}

function lowerCaseStringsInObject(obj) {
  return _.mapValues(obj, v => (v.toLowerCase ? v.toLowerCase() : v))
}

function stringBNValues(obj) {
  return _.mapValues(obj, v => (v && v._ethersType === 'BigNumber' ? v.toString() : v)) // eslint_disable_line
}

function recurseTuple(tuple) {
  if (tuple.components) {
    return _.zipObject(_.map(tuple.components, 'name'), _.map(tuple.components, recurseTuple))
  }
  return tuple.name
}

function parseSwapParameters(parameters) {
  const { order } = parameters
  if (!order) {
    return parameters
  }

  const [
    nonce,
    expiry,
    makerKind,
    makerWallet,
    makerToken,
    makerAmount,
    makerId,
    takerKind,
    takerWallet,
    takerToken,
    takerAmount,
    takerId,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
    affiliateId,
    affiliateKind,
    signatory,
    validator,
    version,
    v,
    r,
    s,
  ] = order.split(',')

  return {
    nonce,
    expiry,
    makerWallet,
    makerToken,
    makerAmount,
    makerId,
    makerKind,
    takerWallet,
    takerToken,
    takerAmount,
    takerId,
    takerKind,
    affiliateWallet,
    affiliateToken,
    affiliateAmount,
    affiliateId,
    affiliateKind,
    signatory,
    validator,
    v,
    r,
    s,
    version,
  }
}

function getParsedInputFromTransaction(transaction, abis = constantAbis) {
  if (!(transaction && transaction.to)) {
    return {}
  }
  const to = transaction.to.toLowerCase()
  const abi = abis[to.toLowerCase()]
  if (!abi) {
    return {}
  }
  const contractInterface = new ethers.utils.Interface(abi)
  const { data } = transaction
  const parsed = contractInterface.parseTransaction({ data })
  const name = parsed.name
  const parameterKeys = _.map(contractInterface.functions[name].inputs, 'name')
  const parameterValues = _.map(parsed.args, s => (s.toString ? s.toString() : s).toLowerCase())
  const parameters = _.zipObject(parameterKeys, parameterValues)
  const value = ethers.utils.formatEther(transaction.value)

  return {
    name,
    parameters:
      to === SWAP_CONTRACT_ADDRESS || to === WRAPPER_CONTRACT_ADDRESS ? parseSwapParameters(parameters) : parameters,
    formattedETHValue: value,
  }
}

function getTransactionDescription(
  transaction,
  tokensByAddress,
  getReadableOrder,
  getReadableSwapOrder,
  abis = constantAbis,
) {
  if (!(transaction && transaction.to) || _.isEmpty(tokensByAddress)) {
    return ''
  }
  const to = transaction.to.toLowerCase()
  const contractInterface = new ethers.utils.Interface(abis[to])
  const { data } = transaction
  const parsed = contractInterface.parseTransaction({ data })
  const name = parsed.name

  const parameterKeys = _.map(contractInterface.functions[name].inputs, 'name')
  const parameterValues = _.map(parsed.args, s => (s.toString ? s.toString() : s).toLowerCase())
  const parameters = _.zipObject(parameterKeys, parameterValues)
  const value = ethers.utils.formatEther(transaction.value)

  if (name === 'deposit') {
    return `Wrap ${value} ETH`
  } else if (name === 'withdraw') {
    return `Unwrap ${ethers.utils.formatEther(parameters.amount)} WETH`
  } else if (name === 'approve') {
    const kind = _.get(tokensByAddress, `${to}.kind`)
    if (kind === 'ERC721') {
      return `Approve ${_.get(tokensByAddress, `${to}.symbol`)} #${parameters.id} for trade`
    }
    return `Approve ${_.get(tokensByAddress, `${to}.symbol`)} for trade`
  } else if (name === 'fill') {
    const order = getReadableOrder(parameters)
    return `Fill order for ${order.tokenAmount} ${_.get(tokensByAddress, `${order.tokenAddress}.symbol`)}`
  } else if (name === 'swap' || name === 'provideOrder') {
    const order = getReadableSwapOrder(parseSwapParameters(parameters))
    const takerToken = tokensByAddress[order.takerToken.toLowerCase()]
    const makerToken = tokensByAddress[order.makerToken.toLowerCase()]

    const takerSide =
      takerToken.kind === 'ERC721'
        ? `${takerToken.symbol} #${order.takerAmount} `
        : `${order.takerAmountFormatted} ${takerToken.symbol}`

    const makerSide =
      takerToken.kind === 'ERC721'
        ? `${makerToken.symbol} #${order.makerAmount} `
        : `${order.makerAmountFormatted} ${makerToken.symbol}`

    return `Fill order for ${takerSide} for ${makerSide}`
  } else if (name === 'authorizeSender') {
    return `Authorize sender`
  } else if (name === 'authorizedSigner') {
    return `Authorize signer`
  }
  return name
}

function parseTransactionFailureEventCode(code) {
  switch (code) {
    case 1:
      return 'Invalid Order'
    case 2:
      return 'Expired'
    case 3:
      return 'Already Filled'
    case 4:
      return 'Invalid ETH Amount'
    case 5:
      return 'Invalid ETH Amount'
    case 6:
      return 'Sender is not Taker'
    case 7:
      return 'Order Cancelled'
    default:
      return ''
  }
}

function getTransactionTextStatus(transactionReceipt) {
  let textStatus = ''
  let eventStatus = ''
  const status = Number(_.get(transactionReceipt, 'status'))
  if (status !== 0 && !status) {
    textStatus = 'pending'
    return { textStatus, eventStatus }
  }
  const events = _.get(transactionReceipt, 'events', [])

  const failedEvent = _.find(events, { event: 'Failed' })
  const eventCode = Number(_.get(failedEvent, 'args.code'))

  if (status === 0) {
    textStatus = 'Failed'
  } else if (status === 1 && eventCode) {
    textStatus = 'Failed'
    eventStatus = parseTransactionFailureEventCode(eventCode)
  } else if (status === 1) {
    textStatus = 'Confirmed'
  } else if (status === null) {
    textStatus = 'Pending'
  }
  return {
    textStatus,
    eventStatus,
  }
}

module.exports = {
  recurseTuple,
  parseAmount,
  formatErrorMessage,
  lowerCaseStringsInObject,
  stringBNValues,
  getParsedInputFromTransaction,
  getTransactionDescription,
  getTransactionTextStatus,
  parseTransactionFailureEventCode,
}
