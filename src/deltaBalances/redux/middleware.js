import _ from 'lodash'
import { getManyBalancesManyAddresses, getManyAllowancesManyAddresses } from '../index'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { SWAP_CONTRACT_ADDRESS, ETH_ADDRESS, web3Provider } from '../../constants'
import { makeEventActionTypes } from '../../utils/redux/templates/event'
import { addTrackedAddresses } from './actions'
import { selectors as deltaBalancesSelectors } from './reducers'
import DebouncedQueue from '../../utils/debouncedQueue'
import { getAirSwapApprovedAvailableTokens } from '../../redux/combinedSelectors'
import { waitForState } from '../../utils/redux/waitForState'

export const gotTokenBalances = balances => ({
  type: 'GOT_TOKEN_BALANCES',
  balances,
})

export const gotSwapTokenApprovals = approvals => ({
  type: 'GOT_SWAP_TOKEN_ALLOWANCES',
  approvals,
})

const websocketChunkSize = 100

let balancesQueue

function loadBalancesForTokenAddressMap(tokenAddressMap) {
  _.mapValues(tokenAddressMap, (tokens, address) => {
    _.chunk(tokens, websocketChunkSize).map(tokenSubset => {
      // We have to make sure an individual eth_call doesn't get too big or it will crash websocket providers that have a max packet size
      getManyBalancesManyAddresses(tokenSubset, [address])
        .then(results => {
          balancesQueue.push(results)
        })
        .catch(e => {
          console.error('error loading balances', tokenSubset, address, e)
        })
    })
  })
}

let swapAllowancesQueue

function loadSwapAllowancesForTokenAddressMap(tokenAddressMap) {
  _.mapValues(tokenAddressMap, (tokens, address) => {
    _.chunk(tokens, websocketChunkSize).map(tokenSubset => {
      getManyAllowancesManyAddresses(tokenSubset, [address], SWAP_CONTRACT_ADDRESS).then(results => {
        swapAllowancesQueue.push(results)
      })
    })
  })
}

function reduceERC20LogsToTokenAddressMap(logs) {
  const tokenAddressMap = _.reduce(
    logs,
    (obj, log) => {
      const values = _.values(log.values)
      const tokenAddress = log.address
      const [address1, address2] = values
      obj[address1] = _.isArray(obj[address1]) ? _.uniq([...obj[address1], tokenAddress]) : [tokenAddress] //eslint-disable-line
      obj[address2] = _.isArray(obj[address2]) ? _.uniq([...obj[address2], tokenAddress]) : [tokenAddress] //eslint-disable-line
      return obj
    },
    {},
  )
  return tokenAddressMap
}

function reduceSwapFillsLogsToTokenAddressMap(logs) {
  const parsedLogs = _.reduce(
    logs,
    (obj, log) => {
      const {
        values: { makerWallet, takerWallet, makerToken, takerToken },
      } = log
      obj[makerWallet] = _.isArray(obj[makerWallet]) //eslint-disable-line
        ? _.uniq([...obj[makerWallet], makerToken, takerToken])
        : [makerToken, takerToken]
      obj[takerWallet] = _.isArray(obj[takerWallet]) //eslint-disable-line
        ? _.uniq([...obj[takerWallet], makerToken, takerToken])
        : [takerToken, takerToken]
      return obj
    },
    {},
  )
  return parsedLogs
}

function filterTokenAddressMapByTrackedAddresses(tokenAddressMap, store) {
  const trackedTokensByAddress = deltaBalancesSelectors.getTrackedTokensByAddress(store.getState())
  const mappedValues = _.mapValues(tokenAddressMap, (tokenAddresses, walletAddress) => {
    const intersection = _.intersection(trackedTokensByAddress[walletAddress], tokenAddresses)
    return intersection.length ? intersection : null
  })
  const cleanedMappedValues = _.pickBy(mappedValues, _.identity)
  return cleanedMappedValues
}

function initializeTrackedAddresses(store) {
  const state = store.getState()
  const balances = deltaBalancesSelectors.getBalances(state)
  const trackedAddresses = deltaBalancesSelectors.getTrackedAddresses(state)
  const uninitializedTrackedAddresses = _.filter(trackedAddresses, ({ address, tokenAddress }) =>
    _.isUndefined(_.get(balances, `${address}.${tokenAddress}`)),
  )

  const uninitializedTrackedTokensByAddress = _.reduce(
    uninitializedTrackedAddresses,
    (obj, { address, tokenAddress }) => {
      if (_.isArray(obj[address])) {
        obj[address] = _.uniq([...obj[address], tokenAddress]) // eslint-disable-line
      } else {
        obj[address] = [tokenAddress] // eslint-disable-line
      }
      return obj
    },
    {},
  )

  loadBalancesForTokenAddressMap(uninitializedTrackedTokensByAddress, store)
  loadSwapAllowancesForTokenAddressMap(uninitializedTrackedTokensByAddress, store)
}

async function addConnectedAddressToTrackedAddresses(store) {
  if (process.env.REACT_APP_INSTANT) {
    await store.dispatch(
      waitForState({
        selector: state => !!getAirSwapApprovedAvailableTokens(state).length,
        result: true,
      }),
    )
  }
  const availableTokens = getAirSwapApprovedAvailableTokens(store.getState())
  const allTokens = tokenSelectors.getAirSwapApprovedTokens(store.getState())
  const tokens = process.env.REACT_APP_INSTANT ? availableTokens : allTokens

  const approvedTokens = _.filter(tokens, t => t.kind !== 'ERC721')
  const connectedAddress = getConnectedWalletAddress(store.getState())

  if (approvedTokens.length && connectedAddress) {
    const tokenAddresses = [..._.map(approvedTokens, 'address'), ETH_ADDRESS]
    const trackedAddresses = tokenAddresses.map(tokenAddress => ({
      address: connectedAddress,
      tokenAddress,
    }))

    store.dispatch(addTrackedAddresses(trackedAddresses))
  }
}

const ethBalances = {}

function initializeETHTracking(store, addresses) {
  addresses.forEach(async address => {
    ethBalances[address.toLowerCase()] = await web3Provider.eth.getBalance(address)
  })
  web3Provider.eth
    .subscribe('newBlockHeaders', error => {
      if (error) {
        throw new Error(error)
      }
    })
    .on('data', () => {
      // don't check eth balance unless the window is active
      if (document.hidden) {
        return
      }
      addresses.forEach(async address => {
        const ethBalance = await web3Provider.eth.getBalance(address)
        if (ethBalance !== ethBalances[address.toLowerCase()]) {
          loadBalancesForTokenAddressMap({ [address.toLowerCase()]: [ETH_ADDRESS] }, store)
        }
      })
    })
}

export default function balancesMiddleware(store) {
  balancesQueue = new DebouncedQueue(results => {
    const mergedResults = _.merge({}, ...results)
    store.dispatch(gotTokenBalances(mergedResults))
  }, 500)

  swapAllowancesQueue = new DebouncedQueue(results => {
    const mergedResults = _.merge({}, ...results)
    store.dispatch(gotSwapTokenApprovals(mergedResults))
  }, 500)

  return next => action => {
    const state = store.getState()
    const address = getConnectedWalletAddress(state)
    const connectedTokenAddressMap = _.pick(deltaBalancesSelectors.getTrackedTokensByAddress(state), [address])
    switch (action.type) {
      case 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS':
        loadBalancesForTokenAddressMap(connectedTokenAddressMap, store)
        break
      case 'GET_TOKEN_BALANCES_FOR_CONNECTED_ADDRESS':
        loadBalancesForTokenAddressMap({ [address]: action.tokens }, store)
        break
      case 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS':
        loadSwapAllowancesForTokenAddressMap(connectedTokenAddressMap, store)
        break
      case 'GET_TOKEN_ALLOWANCES_FOR_CONNECTED_ADDRESS':
        loadSwapAllowancesForTokenAddressMap({ [address]: action.tokens }, store)
        break
      case makeEventActionTypes('erc20Transfers').got:
        const erc20Logs = _.get(action, 'response', [])
        const tokenAddressMap = filterTokenAddressMapByTrackedAddresses(
          reduceERC20LogsToTokenAddressMap(erc20Logs),
          store,
        )
        loadBalancesForTokenAddressMap(tokenAddressMap, store)
        break
      case makeEventActionTypes('trackedEvents').got:
        const response = _.get(action, 'response', [])
        const swapLogs = _.filter(response, { name: 'Swap' })
        const swapTokenAddressMap = filterTokenAddressMapByTrackedAddresses(
          reduceSwapFillsLogsToTokenAddressMap(swapLogs),
          store,
        )
        loadBalancesForTokenAddressMap(swapTokenAddressMap, store)
        break
      default:
    }
    next(action)
    // next(action) mutates the store with the action synchronously, so everything below uses the state after the action occurs
    switch (action.type) {
      case 'ADD_TRACKED_ADDRESSES':
        initializeTrackedAddresses(store)
        break
      case 'ADD_TRACKED_ADDRESS':
        initializeTrackedAddresses(store)
        break
      case 'CONNECTED_WALLET':
        initializeETHTracking(store, [getConnectedWalletAddress(store.getState())])
        addConnectedAddressToTrackedAddresses(store)
        break
      case 'TOKENS_LOADED': // since we track all approved tokens for the connected address, we need to check on both CONNECTED_WALLET and TOKENS_LOADED actions
        addConnectedAddressToTrackedAddresses(store)
        break
      default:
    }
  }
}
