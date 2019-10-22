import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'
import { trackSwapAllContracts, trackSwapCancelAllContracts } from '../../swap/redux/actions'

export const fetchHistoricalSwapFillsByMakerAddress = makerWallet =>
  trackSwapAllContracts({ makerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchHistoricalSwapCancelsByMakerAddress = makerWallet =>
  trackSwapCancelAllContracts({ makerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })
