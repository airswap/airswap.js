export const fetchHistoricalFillsByMakerAddress = makerAddress => ({
  type: 'FETCH_HISTORICAL_FILLS_BY_MAKER_ADDRESS',
  makerAddress,
})

export const fetchHistoricalCancelsByMakerAddress = makerAddress => ({
  type: 'FETCH_HISTORICAL_CANCELS_BY_MAKER_ADDRESS',
  makerAddress,
})

export const fetchHistoricalFailuresByMakerAddress = makerAddress => ({
  type: 'FETCH_HISTORICAL_FAILURES_BY_MAKER_ADDRESS',
  makerAddress,
})

export const fetchHistoricalSwapFillsByMakerAddress = makerAddress => ({
  type: 'FETCH_HISTORICAL_SWAP_FILLS_BY_MAKER_ADDRESS',
  makerAddress,
})

export const fetchHistoricalSwapCancelsByMakerAddress = makerAddress => ({
  type: 'FETCH_HISTORICAL_SWAP_CANCELS_BY_MAKER_ADDRESS',
  makerAddress,
})
