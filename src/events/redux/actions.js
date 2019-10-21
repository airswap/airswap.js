import { trackSwapAllContracts, trackSwapCancelAllContracts } from '../../swap/redux/actions'

export const fetchHistoricalSwapFillsByMakerAddress = makerWallet =>
  trackSwapAllContracts({ makerWallet, fromBlock: 0 })

export const fetchHistoricalSwapCancelsByMakerAddress = makerWallet =>
  trackSwapCancelAllContracts({ makerWallet, fromBlock: 0 })
