import { trackSwapCancel, trackSwapSwap } from '../../swap/redux/eventTrackingActions'

export const fetchHistoricalSwapFillsByMakerAddress = makerWallet => trackSwapSwap({ makerWallet, fromBlock: 0 })

export const fetchHistoricalSwapCancelsByMakerAddress = makerWallet => trackSwapCancel({ makerWallet, fromBlock: 0 })
