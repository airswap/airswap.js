import _ from 'lodash'
import { getManyBalancesManyAddresses, getManyAllowancesManyAddresses } from '../index'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { selectors as apiSelectors } from '../../api/redux'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { SWAP_LEGACY_CONTRACT_ADDRESS, SWAP_CONTRACT_ADDRESS } from '../../constants'
import { makeEventActionTypes } from '../../utils/redux/templates/event'
import { addTrackedAddresses } from './actions'
import { selectors as deltaBalancesSelectors } from './reducers'

export const gotTokenBalances = balances => ({
  type: 'GOT_TOKEN_BALANCES',
  balances,
})

export const gotSwapTokenApprovals = approvals => ({
  type: 'GOT_SWAP_TOKEN_ALLOWANCES',
  approvals,
})

export const gotTokenApprovals = approvals => ({
  type: 'GOT_TOKEN_ALLOWANCES',
  approvals,
})

function loadBalancesForAddresses(addresses, store) {
  const tokens = apiSelectors.getAvailableTokenAddresses(store.getState())
  getManyBalancesManyAddresses(tokens, addresses).then(results => {
    store.dispatch(gotTokenBalances(results))
  })
}

function loadAllowancesForAddresses(addresses, store) {
  const tokens = apiSelectors.getAvailableTokenAddresses(store.getState())
  getManyAllowancesManyAddresses(tokens, addresses, SWAP_CONTRACT_ADDRESS).then(results => {
    store.dispatch(gotSwapTokenApprovals(results))
  })
  getManyAllowancesManyAddresses(tokens, addresses, SWAP_LEGACY_CONTRACT_ADDRESS).then(results => {
    store.dispatch(gotTokenApprovals(results))
  })
}

function reduceERC20LogsToTokenAddressMap(logs) {
  return _.reduce(
    logs,
    (obj, log) => {
      const tokenAddress = log.address
      const address1 = log.parsedLogValues['0']
      const address2 = log.parsedLogValues['1']
      obj[address1] = _.isArray(obj[address1]) ? _.uniq([...obj[address1], tokenAddress]) : [tokenAddress] //eslint-disable-line
      obj[address2] = _.isArray(obj[address2]) ? _.uniq([...obj[address2], tokenAddress]) : [tokenAddress] //eslint-disable-line
      return obj
    },
    {},
  )
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
  _.mapValues(uninitializedTrackedTokensByAddress, (tokens, address) => {
    _.chunk(tokens, 30).map(tokenSubset => {
      // We have to make sure an individual eth_call doesn't get too big or it will crash websocket providers that have a max packet size
      getManyBalancesManyAddresses(tokenSubset, [address]).then(results => {
        store.dispatch(gotTokenBalances(results))
      })
      getManyAllowancesManyAddresses(tokenSubset, [address], SWAP_LEGACY_CONTRACT_ADDRESS).then(results => {
        store.dispatch(gotTokenApprovals(results))
      })
      getManyAllowancesManyAddresses(tokenSubset, [address], SWAP_CONTRACT_ADDRESS).then(results => {
        store.dispatch(gotSwapTokenApprovals(results))
      })
    })
  })
}

function addConnectedAddressToTrackedAddresses(store) {
  const approvedTokens = tokenSelectors.getAirSwapApprovedTokens(store.getState())
  const connectedAddress = getConnectedWalletAddress(store.getState())
  if (approvedTokens.length && connectedAddress) {
    const tokenAddresses = _.map(approvedTokens, 'address')
    const trackedAddresses = tokenAddresses.map(tokenAddress => ({
      address: connectedAddress,
      tokenAddress,
    }))
    store.dispatch(addTrackedAddresses(trackedAddresses))
  }
}

export default function balancesMiddleware(store) {
  return next => action => {
    const state = store.getState()
    const address = getConnectedWalletAddress(state)
    const approvedTokens = tokenSelectors.getAirSwapApprovedTokens(store.getState())
    const approvedTokenAddresses = _.map(approvedTokens, 'address')
    switch (action.type) {
      case 'GET_ALL_BALANCES_FOR_ADDRESS':
        loadBalancesForAddresses([action.address], store)
        break
      case 'GET_ALL_ALLOWANCES_FOR_ADDRESS':
        loadAllowancesForAddresses([action.address], store)
        break
      case 'GET_ALL_BALANCES_FOR_CONNECTED_ADDRESS':
        loadBalancesForAddresses([address], store)
        break
      case 'GET_ALL_ALLOWANCES_FOR_CONNECTED_ADDRESS':
        getManyAllowancesManyAddresses(approvedTokenAddresses, [address], SWAP_CONTRACT_ADDRESS).then(results => {
          store.dispatch(gotSwapTokenApprovals(results))
        })
        getManyAllowancesManyAddresses(approvedTokenAddresses, [address], SWAP_LEGACY_CONTRACT_ADDRESS).then(
          results => {
            store.dispatch(gotTokenApprovals(results))
          },
        )
        break
      case makeEventActionTypes('erc20Transfers').got:
        const logs = _.get(action, 'response', [])
        const addresses = _.keys(reduceERC20LogsToTokenAddressMap(logs))
        loadBalancesForAddresses(addresses, store)
        break
      case 'GOT_LATEST_BLOCK':
        const trackedAddresses = deltaBalancesSelectors.getTrackedWalletAddresses(state)
        const blockAddresses = _.reduce(
          action.block.transactions,
          (addressesAccumulator, { to, from }) =>
            _.uniq(_.compact([(to || '').toLowerCase(), (from || '').toLowerCase(), ...addressesAccumulator])),
          [],
        )
        const addressesToUpdate = _.intersection(trackedAddresses, blockAddresses)
        if (addressesToUpdate.length) {
          loadBalancesForAddresses(addressesToUpdate, store)
        }
        break
      default:
    }
    next(action)
    // next(action) mutates the store with the action synchronously, so everything below uses the state after the action occurs
    switch (action.type) {
      case 'ADD_TRACKED_ADDRESSES':
        initializeTrackedAddresses(store)
        break
      case 'CONNECTED_WALLET':
        addConnectedAddressToTrackedAddresses(store)
        break
      case 'TOKENS_LOADED': // since we track all approved tokens for the connected address, we need to check on both CONNECTED_WALLET and TOKENS_LOADED actions
        addConnectedAddressToTrackedAddresses(store)
        break
      default:
    }
  }
}
