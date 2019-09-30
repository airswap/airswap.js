const ethers = require('ethers')
const _ = require('lodash')
const tokenMetadata = require('../tokens')

const {
  httpProvider,
  DELTA_BALANCES_CONTRACT_ADDRESS,
  abis,
  TOKEN_APPROVAL_CHECK_AMOUNT,
  ETH_ADDRESS,
} = require('../constants')

const { call } = require('../utils/gethRead')

const defaultProvider = traceMethodCalls(httpProvider)

// Putting this in place until ethers.js implements a proper websocket provider (https://github.com/ethers-io/ethers.js/issues/141)
// this allows mass balance reads to be done over websocket. Keep in mind the eth_call payload can't be too big or it will crash the websocket
function traceMethodCalls(obj, blockTag = 'latest') {
  const handler = {
    get(target, propKey) {
      if (propKey === 'call') {
        return async function({ to, data }) {
          const toResolved = await to
          const res = await call({ to: toResolved, data }, blockTag)

          return res
        }
      }
      return target[propKey]
    },
  }
  return new Proxy(obj, handler)
}

const deltaBalancesContract = new ethers.Contract(
  DELTA_BALANCES_CONTRACT_ADDRESS,
  abis[DELTA_BALANCES_CONTRACT_ADDRESS],
  defaultProvider,
)

function getManyBalancesManyAddresses(tokens, addresses) {
  return deltaBalancesContract.allBalancesForManyAccounts(addresses, tokens).then(results => {
    const t = tokens.length
    const balances = _.map(addresses, (address, i) => {
      const bnBalances = results.slice(i * t, (i + 1) * t)
      return [address, _.zipObject(tokens, _.map(bnBalances, b => b.toString()))]
    })
    return _.fromPairs(balances)
  })
}

function getManyAllowancesManyAddresses(tokens, addresses, spender) {
  return deltaBalancesContract.allAllowancesForManyAccounts(addresses, spender, tokens).then(results => {
    const t = tokens.length
    const allAllowances = _.map(addresses, (address, i) => {
      const allowances = results.slice(i * t, (i + 1) * t)
      return [
        address,
        _.zipObject(
          tokens,
          _.map(allowances, (b, j) => {
            if (tokens[j] === ETH_ADDRESS) {
              return true
            }
            return Number(b.toString()) > Number(TOKEN_APPROVAL_CHECK_AMOUNT)
          }),
        ),
      ]
    })
    return _.fromPairs(allAllowances)
  })
}

async function getAirSwapTokenBalancesForManyAddresses(addresses) {
  await tokenMetadata.ready
  return getManyBalancesManyAddresses(tokenMetadata.tokenAddresses, addresses)
}

async function getAirSwapTokenAllowancesForManyAddresses(addresses, spender) {
  await tokenMetadata.ready
  return getManyAllowancesManyAddresses(tokenMetadata.tokenAddresses, addresses, spender)
}

module.exports = {
  getManyBalancesManyAddresses,
  getManyAllowancesManyAddresses,
  getAirSwapTokenBalancesForManyAddresses,
  getAirSwapTokenAllowancesForManyAddresses,
  traceMethodCalls,
}
