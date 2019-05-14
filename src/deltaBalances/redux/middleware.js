import _ from 'lodash'
import { getManyBalancesManyAddresses, getManyAllowancesManyAddresses } from '../index'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { selectors as apiSelectors } from '../../api/redux'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../constants'

export const gotTokenBalances = balances => ({
  type: 'GOT_TOKEN_BALANCES',
  balances,
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
  getManyAllowancesManyAddresses(tokens, addresses, EXCHANGE_CONTRACT_ADDRESS).then(results => {
    store.dispatch(gotTokenApprovals(results))
  })
}

function loadMakerBalancesAndAddresses(store) {
  // without this optimization makers' allowances and balanecs were the two slowest calls in the application, each around 1MB
  // breaking them apart like this allows for much smaller payload sizes
  const intents = apiSelectors.getConnectedIndexerIntents(store.getState())
  const makerAddresses = _.uniq(_.map(intents, 'makerAddress'))
  const makerTokensByMaker = _.zipObject(makerAddresses, _.map(makerAddresses, () => []))
  _.each(intents, ({ makerToken, makerAddress }) => {
    makerTokensByMaker[makerAddress] = _.uniq([...makerTokensByMaker[makerAddress], makerToken])
  })

  _.mapValues(makerTokensByMaker, (makerTokens, makerAddress) => {
    getManyBalancesManyAddresses(makerTokens, [makerAddress]).then(results => {
      store.dispatch(gotTokenBalances(results))
    })
    getManyAllowancesManyAddresses(makerTokens, [makerAddress], EXCHANGE_CONTRACT_ADDRESS).then(results => {
      store.dispatch(gotTokenApprovals(results))
    })
  })
}

let makerBalancesInitialized = false
let addressBalancesInitialized = false

export default function balancesMiddleware(store) {
  return next => action => {
    const state = store.getState()
    const address = getConnectedWalletAddress(state)
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
        loadAllowancesForAddresses([address], store)
        break
      default:
    }
    if (apiSelectors.getAvailableTokenAddresses(state).length && !makerBalancesInitialized) {
      makerBalancesInitialized = true
      loadMakerBalancesAndAddresses(store)
    }
    if (apiSelectors.getAvailableTokenAddresses(state).length && address && !addressBalancesInitialized) {
      addressBalancesInitialized = true
      loadBalancesForAddresses([address], store)
      loadAllowancesForAddresses([address], store)
    }
    return next(action)
  }
}
