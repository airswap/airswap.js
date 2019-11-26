import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'

import { trackSwapAllContracts, trackSwapCancelAllContracts } from '../../swap/redux/actions'

export const fetchHistoricalSwapFillsByMakerAddress = signerWallet =>
  trackSwapAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchHistoricalSwapCancelsByMakerAddress = signerWallet =>
  trackSwapCancelAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchingHistoricalEvents = ({ name, namespace }) => ({
  name,
  namespace,
  type: 'FETCHING_HISTORICAL_EVENTS',
})

export const fetchedHistoricalEvents = ({ name, namespace }) => ({
  name,
  namespace,
  type: 'FETCHED_HISTORICAL_EVENTS',
})
