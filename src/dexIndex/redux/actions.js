export const fetchSetDexIndexPrices = stackId => ({
  type: 'GET_DEXINDEX_PRICES',
  stackId,
})

export const gotDexIndexResponse = ({ stackId, dexIndexResponse }) => ({
  type: 'GOT_CHECKOUT_FRAME_DEXINDEX_RESPONSE',
  dexIndexResponse,
  stackId,
})

export const startDexIndexQuery = stackId => ({
  type: 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING',
  isDexIndexQuerying: true,
  stackId,
})

export const endDexIndexQuery = stackId => ({
  type: 'SET_CHECKOUT_FRAME_DEXINDEX_QUERYING',
  isDexIndexQuerying: false,
  stackId,
})
