import _ from 'lodash'
import { combineReducers } from 'redux'
import BigNumber from 'bignumber.js'
import { createSelector } from 'reselect'
import { BASE_ASSET_TOKEN_ADDRESSES, MAX_DISPLAY_DECIMALS, GAS_LIMITS, NETWORK, NETWORK_MAPPING } from '../../constants'
import { parseAmount } from '../../utils/transformations'
import { connectSelectorContainer } from '../../utils/redux'
import tokenMetadata from '../index'

const defaultState = Object.keys(NETWORK_MAPPING).map(network => ({
  airswapUI: 'yes',
  colors: ['#343434', '#7f7f7c', '#8c8c8c', '#939493', '#d4d6d4'],
  symbol: 'ETH',
  decimals: '18',
  network: Number(network),
  airswap_img_url: 'https://s3.amazonaws.com/airswap-token-images/ETH.png',
  address: '0x0000000000000000000000000000000000000000',
}))

// REDUCER DEFINITION

const data = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.tokens) {
        const newTokens = action.tokens.map(token => ({
          ...token,
          network: token.network || NETWORK,
        }))
        const intersection = _.intersection(_.map(state, 'address'), _.map(newTokens, 'address'))
        const intersectionOverwrite = _.map(intersection, address =>
          Object.assign({}, _.find(newTokens, { address }), _.find(state, { address })),
        )
        return _.uniqBy(
          [...newTokens, ...intersectionOverwrite, ...state],
          ({ address, network }) => `${address}${network}`,
        )
      } else if (action.token) {
        return _.uniqBy(
          [
            {
              ...action.token,
              network: action.token.network || NETWORK,
            },
            ...state,
          ],
          ({ address, network }) => `${address}${network}`,
        )
      }
      return state
    case 'ADD_TOKEN_METADATA':
      const newMetadata = action.metadata.map(token => ({
        ...token,
        network: token.network || NETWORK,
      }))

      return _.uniqBy([...newMetadata, ...state], ({ address, network }) => `${address}${network}`)
    default:
      return state
  }
}

const nftItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NFT_ITEM':
      return _.uniqBy(
        [
          {
            ...action.token,
            network: NETWORK,
          },
          ...state,
        ],
        token => [token.address, token.id].join(','),
      )

    default:
      return state
  }
}

const ready = (state = false, action) => {
  switch (action.type) {
    case 'TOKENS_LOADED':
      return true
    default:
      return state
  }
}

export default combineReducers({
  data,
  nftItems,
  ready,
})

// Tokens
const getNFTItems = state => _.filter(state.tokens.nftItems, { network: NETWORK })
const getTokens = createSelector(
  state => _.filter(state.tokens.data, { network: NETWORK }),
  getNFTItems,
  (tokens, nfts) => ({ ...tokens, ...nfts }),
)
const getAirSwapApprovedTokens = createSelector(getTokens, tokens => _.filter(tokens, { airswapUI: 'yes' }))
const areTokensReady = state => state.tokens.ready
const getTokenAddresses = createSelector(getTokens, t => _.map(t, 'address'))
const getTokenBySymbol = (state, symbol) => _.find(getTokens(state), { symbol })
const getTokensBySymbol = createSelector(getTokens, t => _.keyBy(t, 'symbol'))
const getAirSwapApprovedTokensBySymbol = createSelector(getAirSwapApprovedTokens, t => _.keyBy(t, 'symbol'))
const getTokensByAddress = createSelector(getTokens, t => _.keyBy(t, 'address'))
const getAirSwapApprovedTokensByAddress = createSelector(getAirSwapApprovedTokens, t => _.keyBy(t, 'address'))
const getTokensSymbols = createSelector(getTokens, t => _.map(t, 'symbol'))
const getTokensSymbolsByAddress = createSelector(getTokensByAddress, tokensByAddress =>
  _.mapValues(tokensByAddress, t => t.symbol),
)
const getTokenAddressesBySymbol = createSelector(getTokensBySymbol, tokensBySymbol =>
  _.mapValues(tokensBySymbol, t => t.address),
)

const makeGetNFTItemByAddressAndId = createSelector(getNFTItems, items => (tokenAddress, tokenId) =>
  _.find(items, t => t.address === tokenAddress && t.id === tokenId),
)

const makeFormatBySymbol = createSelector(getTokensBySymbol, getTokensSymbols, (tokensBySymbol, tokensSymbols) =>
  _.zipObject(
    tokensSymbols,
    tokensSymbols.map(symbol => {
      const { decimals } = tokensBySymbol[symbol]
      const power = window.Math.pow(10, Number(decimals))
      return {
        display: value => new BigNumber(value).div(power).toString(),
        full: value => new BigNumber(value).times(power).toString(),
      }
    }),
  ),
)

const makeParseBySymbol = createSelector(getTokensBySymbol, getTokensSymbols, (tokensBySymbol, tokensSymbols) =>
  _.zipObject(
    tokensSymbols,
    tokensSymbols.map(symbol => value => {
      const { decimals } = tokensBySymbol[symbol]
      return parseAmount(value, window.Math.min(Number(decimals), MAX_DISPLAY_DECIMALS))
    }),
  ),
)

const makeParseByToken = createSelector(getTokens, tokens => (tokenQuery, displayAmount) => {
  const token = _.find(tokens, tokenQuery)
  if (!token) {
    return '0'
  }
  const { decimals } = token
  return parseAmount(displayAmount, window.Math.min(Number(decimals), MAX_DISPLAY_DECIMALS))
})

const makeFullByToken = createSelector(getTokens, tokens => (tokenQuery, displayAmount) => {
  const token = _.find(tokens, tokenQuery)
  if (!token) return '0'
  if (!Number(token.decimals)) return displayAmount
  const power = window.Math.pow(10, Number(token.decimals))
  return new BigNumber(displayAmount).div(power).toString()
})

const makeAtomicByToken = createSelector(getTokens, tokens => (tokenQuery, displayAmount) => {
  const token = _.find(tokens, tokenQuery)
  if (!token) return '0'
  if (!Number(token.decimals)) return displayAmount

  const power = window.Math.pow(10, Number(token.decimals))
  return new BigNumber(displayAmount).times(power).toString()
})

const makeDisplayByToken = createSelector(
  getTokens,
  makeParseBySymbol,
  (tokens, parseBySymbol) => (tokenQuery, displayAmount) => {
    const token = _.find(tokens, tokenQuery)
    if (!token) return '0'
    if (!Number(token.decimals)) return displayAmount

    const power = window.Math.pow(10, Number(token.decimals))
    const val = parseBySymbol[token.symbol](new BigNumber(displayAmount).div(power).toString())
    return val
  },
)

const makeDisplayBySymbol = createSelector(
  getTokensSymbols,
  makeFormatBySymbol,
  makeParseBySymbol,
  (tokensSymbols, formatBySymbol, parseBySymbol) =>
    _.zipObject(
      tokensSymbols,
      tokensSymbols.map(symbol => value => parseBySymbol[symbol](formatBySymbol[symbol].display(value))),
    ),
)

const makeDisplayByAddress = createSelector(
  getTokensSymbolsByAddress,
  makeDisplayBySymbol,
  (tokensSymbolsByAddress, displayBySymbol) => address => displayBySymbol[tokensSymbolsByAddress[address]],
)

const makeGetReadableOrder = createSelector(
  getTokensSymbolsByAddress,
  makeFullByToken,
  makeParseByToken,
  (tokenSymbolsByAddress, fullByToken, parseByToken) => order =>
    tokenMetadata.ready ? tokenMetadata.getReadableOrder(order, tokenSymbolsByAddress, fullByToken, parseByToken) : [],
)

const makeGetReadableSwapOrder = createSelector(
  getTokensByAddress,
  makeFullByToken,
  makeParseByToken,
  (tokenByAddress, fullByToken, parseByToken) => (order, baseAsset) =>
    tokenMetadata.ready
      ? tokenMetadata.getReadableSwapOrder(order, tokenByAddress, fullByToken, parseByToken, baseAsset)
      : [],
)

const makeClampValue = createSelector(makeParseBySymbol, parseBySymbol => (symbol, amount) => {
  const maxValue = 1000000
  const parsedAmount = parseBySymbol[symbol](Number(amount))
  return Math.min(maxValue, parsedAmount)
})

const getBaseTokens = createSelector(getTokensByAddress, tokensByAddress => {
  const ret = {}
  BASE_ASSET_TOKEN_ADDRESSES.forEach(address => {
    ret[address] = tokensByAddress[address]
  })
  return ret
})

const makeGetExchangeFillGasLimitByToken = createSelector(getTokens, tokens => tokenQuery => {
  const token = _.find(tokens, tokenQuery)
  return _.get(token, 'gasLimit', GAS_LIMITS.exchangeFill)
})

export {
  getTokens,
  getNFTItems,
  areTokensReady,
  getTokensSymbols,
  getTokenAddresses,
  getTokenBySymbol,
  getTokensBySymbol,
  getTokensByAddress,
  makeGetNFTItemByAddressAndId,
  makeFormatBySymbol,
  makeFullByToken,
  makeAtomicByToken,
  makeDisplayByToken,
  makeParseBySymbol,
  makeDisplayBySymbol,
  makeDisplayByAddress,
  makeClampValue,
  getTokensSymbolsByAddress,
  getTokenAddressesBySymbol,
  getBaseTokens,
  makeGetReadableOrder,
  makeParseByToken,
  makeGetReadableSwapOrder,
}

export const selectors = {
  getTokens,
  getNFTItems,
  areTokensReady,
  getTokensSymbols,
  getTokenAddresses,
  getTokenBySymbol,
  getTokensBySymbol,
  getTokensByAddress,
  makeGetNFTItemByAddressAndId,
  makeFormatBySymbol,
  makeFullByToken,
  makeAtomicByToken,
  makeDisplayByToken,
  makeParseBySymbol,
  makeDisplayBySymbol,
  makeDisplayByAddress,
  makeClampValue,
  getTokensSymbolsByAddress,
  getTokenAddressesBySymbol,
  getBaseTokens,
  makeGetReadableOrder,
  getAirSwapApprovedTokens,
  getAirSwapApprovedTokensBySymbol,
  getAirSwapApprovedTokensByAddress,
  makeParseByToken,
  makeGetExchangeFillGasLimitByToken,
  makeGetReadableSwapOrder,
}

export const containers = {
  makeFormatBySymbol: connectSelectorContainer(makeFormatBySymbol, 'formatBySymbol'),
  makeParseBySymbol: connectSelectorContainer(makeParseBySymbol, 'parseBySymbol'),
  makeClampValue: connectSelectorContainer(makeClampValue, 'clampValue'),
  getTokens: connectSelectorContainer(getTokens, 'tokens'),
}
