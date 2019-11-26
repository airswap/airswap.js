import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { submitDelegateFactoryCreateDelegate } from './contractFunctionActions'

export const createDelegateForConnectedWallet = () => (dispatch, getState) => {
  const address = getConnectedWalletAddress(getState())
  dispatch(submitDelegateFactoryCreateDelegate({ delegateTradeWallet: address }))
}
