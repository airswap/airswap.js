import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'

import { trackSwapAllContracts, trackSwapCancelAllContracts } from '../../swap/redux/actions'

export const fetchHistoricalSwapFillsByMakerAddress = signerWallet =>
  trackSwapAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchHistoricalSwapCancelsByMakerAddress = signerWallet =>
  trackSwapCancelAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })
