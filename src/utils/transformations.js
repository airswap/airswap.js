import { ethers } from 'ethers/index'
import { abis } from '../constants'

const _ = require('lodash')
const BigNumber = require('bignumber.js')

BigNumber.config({ ERRORS: false })
BigNumber.config({ EXPONENTIAL_AT: 1e9 }) //eslint-disable-line

export function parseAmount(amount, precision) {
  const num = new BigNumber(Math.max(0, Number(amount)))
  return Number(num.toFixed(precision, BigNumber.ROUND_FLOOR))
}

export function formatErrorMessage(error) {
  if (_.isObject(error) && error.message) {
    return error.message.split('\n')[0] // sometimes metamask returns stacktraces and this removes them
  } else if (_.isString(error)) {
    return error
  }
  return ''
}

export function lowerCaseStringsInObject(obj) {
  return _.mapValues(obj, v => (v.toLowerCase ? v.toLowerCase() : v))
}

export function stringBNValues(obj) {
  return _.mapValues(obj, v => (v && v._ethersType === 'BigNumber' ? v.toString() : v)) // eslint_disable_line
}

export function getParsedInputFromTransaction(transaction) {
  const to = transaction.to.toLowerCase()
  const contractInterface = new ethers.utils.Interface(abis[to])
  const { data } = transaction
  const parsed = contractInterface.parseTransaction({ data })
  const name = parsed.name
  const parameterKeys = _.map(contractInterface.functions[name].inputs, 'name')
  const parameterValues = _.map(parsed.args, s => (s.toString ? s.toString() : s).toLowerCase())
  const parameters = _.zipObject(parameterKeys, parameterValues)
  const value = ethers.utils.formatEther(transaction.value)
  return { name, parameters, formattedETHValue: value }
}

export function getTransactionDescription(transaction, tokensByAddress, getReadableOrder) {
  if (_.isEmpty(tokensByAddress)) {
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
    return `Unwrap ${ethers.utils.formatEther(parameters.wad)} WETH`
  } else if (name === 'approve') {
    return `Approve ${_.get(tokensByAddress, `${to}.symbol`)} for trade`
  } else if (name === 'fill') {
    const order = getReadableOrder(parameters)
    return `Fill order for ${order.tokenAmount} ${_.get(tokensByAddress, `${order.tokenAddress}.symbol`)}`
  }
}

export function getTransactionTextStatus(transactionReceipt) {
  let textStatus = ''
  let eventStatus = ''
  const status = _.get(transactionReceipt, 'status')
  if (!status) {
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
    eventStatus = (N => {
      switch (N) {
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
    })(eventCode)
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
