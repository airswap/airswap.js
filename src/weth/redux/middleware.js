import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { trackWethDeposit, trackWethWithdrawal } from './eventTrackingActions'
import { WETH_CONTRACT_ADDRESS, ETH_ADDRESS } from '../../constants'
import { getTokenBalancesForConnectedAddress } from '../../deltaBalances/redux/actions'

const initTrackWeth = store => {
  const connectedWalletAddress = getConnectedWalletAddress(store.getState())
  store.dispatch(
    trackWethDeposit({
      owner: connectedWalletAddress.toLowerCase(),
      callback: () => store.dispatch(getTokenBalancesForConnectedAddress([WETH_CONTRACT_ADDRESS, ETH_ADDRESS])),
    }),
  )
  store.dispatch(
    trackWethWithdrawal({
      owner: connectedWalletAddress.toLowerCase(),
      callback: () => store.dispatch(getTokenBalancesForConnectedAddress([WETH_CONTRACT_ADDRESS, ETH_ADDRESS])),
    }),
  )
}

export default function wethMiddleware(store) {
  return next => action => {
    next(action)
    switch (action.type) {
      case 'CONNECTED_WALLET':
        initTrackWeth(store)
        break
      default:
    }
  }
}
