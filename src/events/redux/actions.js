import { SWAP_CONTRACT_DEPLOY_BLOCK } from '../../constants'

import { trackSwapAllContracts, trackSwapCancelAllContracts } from '../../swap/redux/actions'

export const fetchHistoricalSwapFillsByMakerAddress = signerWallet =>
  trackSwapAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchHistoricalSwapCancelsByMakerAddress = signerWallet =>
  trackSwapCancelAllContracts({ signerWallet, fromBlock: SWAP_CONTRACT_DEPLOY_BLOCK })

export const fetchingHistoricalEvents = ({ name, namespace, contract, params }) => ({
  name,
  namespace,
  contract,
  params,
  type: 'FETCHING_HISTORICAL_EVENTS',
})

export const fetchedHistoricalEvents = ({ name, namespace, contract, params }, events) => ({
  name,
  namespace,
  events,
  contract,
  params,
  type: 'FETCHED_HISTORICAL_EVENTS',
})
