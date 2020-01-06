const fetch = require('isomorphic-fetch')
const BigNumber = require('bignumber.js')
const _ = require('lodash')
const { NETWORK, BASE_ASSET_TOKENS_SYMBOLS } = require('../constants')
const { flatten } = require('../swap/utils')

const TOKEN_METADATA_BASE_URL = 'https://token-metadata.airswap.io'
const OPENSEA_API_URL = NETWORK === 4 ? 'https://rinkeby-api.opensea.io/api/v1' : 'https://api.opensea.io/api/v1'
const TOKEN_LIST_URL = `${TOKEN_METADATA_BASE_URL}/${NETWORK === 4 ? 'rinkebyTokens' : 'tokens'}`
const MAX_DISPLAY_DECIMALS = 8
const makeCrawlTokenUrl = address =>
  `${TOKEN_METADATA_BASE_URL}/crawlTokenData?address=${address}${NETWORK === 4 ? '&test=true' : ''}`
const makeCrawlNFTItemUrl = (address, id) => `${OPENSEA_API_URL}/asset/${address}/${id}`

BigNumber.config({ ERRORS: false })
BigNumber.config({ EXPONENTIAL_AT: 1e9 }) //eslint-disable-line

function fetchTokens() {
  return new Promise((resolve, reject) => {
    fetch(TOKEN_LIST_URL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function crawlToken(tokenAddress) {
  return new Promise((resolve, reject) => {
    fetch(makeCrawlTokenUrl(tokenAddress), {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function crawlNFTItem(tokenAddress, tokenId) {
  return new Promise((resolve, reject) => {
    fetch(makeCrawlNFTItemUrl(tokenAddress, tokenId), {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function parseAmount(amount, precision) {
  const num = new BigNumber(Math.max(0, Number(amount)))
  return Number(num.toFixed(precision, BigNumber.ROUND_FLOOR))
}

class TokenMetadata {
  constructor() {
    this.tokens = []
    this.nftItems = []
    this.ready = fetchTokens().then(tokens => this.setTokens(tokens))
  }
  setTokens(tokens) {
    this.tokens = tokens
    this.airswapUITokens = _.filter(tokens, { airswapUI: 'yes' })
    this.tokensByAddress = _.keyBy(tokens, 'address')
    this.tokenSymbolsByAddress = _.mapValues(this.tokensByAddress, t => t.symbol)
    this.tokenAddresses = _.map(this.tokens, t => t.address)
    this.tokensBySymbol = _.keyBy(tokens, 'symbol')
    this.tokenAddressesBySymbol = _.mapValues(this.tokensBySymbol, t => t.address)
    return tokens
  }
  crawlToken(address) {
    return crawlToken(address).then(token => {
      this.tokens.push(token)
      return token
    })
  }
  async crawlNFTItem(address, id) {
    const nftItem = await crawlNFTItem(address, id).then(token => ({
      name: token.asset_contract.name,
      symbol: token.asset_contract.symbol,
      address: token.asset_contract.address,
      id: token.token_id,
      kind: 'ERC721',
      img_url: token.image_url,
    }))
    this.nftItems.push(nftItem)
    return nftItem
  }
  formatSignificantDigitsByToken(tokenQuery, value) {
    const token = _.find(this.tokens, tokenQuery)
    if (!token) {
      throw new Error('token not in metadata, crawl before for next retry')
    }
    const { decimals } = token
    return parseAmount(value, Math.min(Number(decimals), MAX_DISPLAY_DECIMALS))
  }
  formatAtomicValueByToken(tokenQuery, value) {
    const token = _.find(this.tokens, tokenQuery)
    if (!token) {
      throw new Error('token not in metadata, crawl before for next retry')
    }
    const { decimals } = token
    const power = 10 ** Number(decimals)
    return new BigNumber(value).times(power).toFixed(0)
  }
  formatFullValueByToken(tokenQuery, value) {
    const token = _.find(this.tokens, tokenQuery)
    if (!token) {
      throw new Error('token not in metadata, crawl before for next retry')
    }
    const { decimals } = token
    const power = 10 ** Number(decimals)
    return new BigNumber(value).div(power).toString()
  }
  formatDisplayValueByToken(tokenQuery, value) {
    return this.formatSignificantDigitsByToken(tokenQuery, this.formatFullValueByToken(tokenQuery, value))
  }
  isBaseAsset(token, pair) {
    const otherToken = _.first(_.without(pair, token))
    if (!otherToken) {
      throw new Error('invalid pair')
    } else if (!_.includes(pair, token)) {
      throw new Error('token not in pair')
    }
    const { ETH, WETH, DAI } = this.tokenAddressesBySymbol
    const baseAssets = [ETH, WETH, DAI]
    if (_.includes(baseAssets, token) && !_.includes(baseAssets, otherToken)) {
      return true
    } else if (!_.includes(baseAssets, token) && _.includes(baseAssets, otherToken)) {
      return false
    } else if (_.includes(baseAssets, token) && _.includes(baseAssets, otherToken)) {
      if (baseAssets.indexOf(token) === baseAssets.indexOf(otherToken)) {
        throw new Error('tokens cannot be the same')
      } else if (baseAssets.indexOf(token) < baseAssets.indexOf(otherToken)) {
        return true
      } else if (baseAssets.indexOf(token) > baseAssets.indexOf(otherToken)) {
        return false
      }
    } else if (!_.includes(baseAssets, token) && !_.includes(baseAssets, otherToken)) {
      const first = _.first(_.sortBy(pair))
      if (token === first) {
        return true
      }
      return false
    }
  }
  getReadableOrder(order, tokenSymbolsByAddressParam, formatFullValueByTokenParam, parseValueByTokenParam) {
    const fullByToken = formatFullValueByTokenParam || this.formatFullValueByToken.bind(this)
    const parseByToken = parseValueByTokenParam || this.formatSignificantDigitsByToken.bind(this)
    const tokenSymbolsByAddress = tokenSymbolsByAddressParam || this.tokenSymbolsByAddress
    const { makerAddress, makerAmount, makerToken, takerAddress, takerAmount, takerToken, expiration, nonce } = order

    const takerAmountFull = fullByToken({ address: takerToken }, takerAmount)
    const makerAmountFull = fullByToken({ address: makerToken }, makerAmount)

    const takerAmountFormatted = parseByToken({ address: takerToken }, takerAmountFull)
    const makerAmountFormatted = parseByToken({ address: makerToken }, makerAmountFull)
    const takerSymbol = tokenSymbolsByAddress[takerToken]
    const makerSymbol = tokenSymbolsByAddress[makerToken]

    let ethAmount = 0
    let ethAmountFull = 0

    let tokenAmount = 0
    let tokenAmountFull = 0

    let baseTokenAmount = 0
    let baseTokenAmountFull = 0
    let baseTokenSymbol = ''

    let tokenSymbol = ''
    let tokenAddress = ''

    let price

    if (takerSymbol === 'ETH' || takerSymbol === 'WETH') {
      ethAmount = takerAmountFormatted
      ethAmountFull = takerAmountFull
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
    } else if (makerSymbol === 'ETH' || makerSymbol === 'WETH') {
      ethAmount = makerAmountFormatted
      ethAmountFull = makerAmountFull
      tokenAmount = takerAmountFormatted
      tokenAmountFull = takerAmountFull
      tokenSymbol = takerSymbol
      tokenAddress = takerToken
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(takerSymbol)) {
      baseTokenAmount = takerAmountFormatted
      baseTokenAmountFull = takerAmountFull
      baseTokenSymbol = takerSymbol
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(makerSymbol)) {
      baseTokenAmount = makerAmountFormatted
      baseTokenAmountFull = makerAmountFull
      baseTokenSymbol = makerSymbol
      tokenAmount = takerAmountFormatted
      tokenAmountFull = takerAmountFull
      tokenSymbol = takerSymbol
      tokenAddress = takerToken
    }

    // if eth/weth is involved, set price in eth terms
    // otherwise set price in base token terms
    if (takerSymbol === 'ETH' || takerSymbol === 'WETH' || makerSymbol === 'ETH' || makerSymbol === 'WETH') {
      price = parseByToken({ symbol: 'ETH' }, new BigNumber(ethAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(takerSymbol)) {
      price = parseByToken({ symbol: takerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(makerSymbol)) {
      price = parseByToken({ symbol: makerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    }

    return {
      ...order,
      takerAmountFormatted,
      makerAmountFormatted,
      takerSymbol,
      makerSymbol,
      makerAddress,
      makerToken,
      takerAddress,
      takerToken,
      makerAmount,
      takerAmount,
      expiration,
      nonce,
      ethAmount,
      price,
      tokenSymbol,
      tokenAmount,
      tokenAddress,
      baseTokenAmount,
      baseTokenSymbol,
    }
  }
  getReadableSwapOrder(orderParams, tokenByAddressParam, formatFullValueByTokenParam, parseValueByTokenParam) {
    const order = orderParams.maker ? flatten(orderParams) : orderParams
    const fullByToken = formatFullValueByTokenParam || this.formatFullValueByToken.bind(this)
    const parseByToken = parseValueByTokenParam || this.formatSignificantDigitsByToken.bind(this)
    const tokensByAddress = tokenByAddressParam || this.tokensByAddress
    const { makerWallet, makerAmount, makerToken, takerWallet, takerAmount, takerToken, expiry, nonce } = order
    let takerAmountFull
    let takerAmountFormatted
    let makerAmountFull
    let makerAmountFormatted
    const makerKind = _.get(tokensByAddress[makerToken], 'kind')
    const takerKind = _.get(tokensByAddress[takerToken], 'kind')

    if (takerKind === 'ERC721') {
      takerAmountFull = takerAmount
      takerAmountFormatted = takerAmountFull
    } else {
      takerAmountFull = fullByToken({ address: takerToken }, takerAmount)
      takerAmountFormatted = parseByToken({ address: takerToken }, takerAmountFull)
    }

    if (makerKind === 'ERC721') {
      makerAmountFull = makerAmount
      makerAmountFormatted = makerAmountFull
    } else {
      makerAmountFull = fullByToken({ address: makerToken }, makerAmount)
      makerAmountFormatted = parseByToken({ address: makerToken }, makerAmountFull)
    }

    const takerSymbol = _.get(tokensByAddress[takerToken], 'symbol')
    const makerSymbol = _.get(tokensByAddress[makerToken], 'symbol')

    let ethAmount = 0
    let ethAmountFull = 0

    let tokenAmount = 0
    let tokenAmountFull = 0

    let baseTokenAmount = 0
    let baseTokenAmountFull = 0
    let baseTokenSymbol = ''

    let tokenSymbol = ''
    let tokenAddress = ''
    let tokenKind = ''

    let price

    if (takerSymbol === 'ETH' || takerSymbol === 'WETH') {
      ethAmount = takerAmountFormatted
      ethAmountFull = takerAmountFull
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
      tokenKind = makerKind
    } else if (makerSymbol === 'ETH' || makerSymbol === 'WETH') {
      ethAmount = makerAmountFormatted
      ethAmountFull = makerAmountFull
      tokenAmount = takerAmountFormatted
      tokenAmountFull = takerAmountFull
      tokenSymbol = takerSymbol
      tokenAddress = takerToken
      tokenKind = takerKind
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(takerSymbol)) {
      baseTokenAmount = takerAmountFormatted
      baseTokenAmountFull = takerAmountFull
      baseTokenSymbol = takerSymbol
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
      tokenKind = makerKind
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(makerSymbol)) {
      baseTokenAmount = makerAmountFormatted
      baseTokenAmountFull = makerAmountFull
      baseTokenSymbol = makerSymbol
      tokenAmount = takerAmountFormatted
      tokenAmountFull = takerAmountFull
      tokenSymbol = takerSymbol
      tokenAddress = takerToken
      tokenKind = takerKind
    }

    // set price in base token terms if there is a base token
    // otherwise, set price in eth terms
    if (takerSymbol === 'ETH' || takerSymbol === 'WETH' || makerSymbol === 'ETH' || makerSymbol === 'WETH') {
      price = parseByToken({ symbol: 'ETH' }, new BigNumber(ethAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(takerSymbol)) {
      price = parseByToken({ symbol: takerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKENS_SYMBOLS.includes(makerSymbol)) {
      price = parseByToken({ symbol: makerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    }

    return {
      ...order,
      takerAmountFormatted,
      makerAmountFormatted,
      takerSymbol,
      makerSymbol,
      makerAddress: makerWallet,
      makerWallet,
      makerToken,
      takerAddress: takerWallet,
      takerWallet,
      takerToken,
      makerAmount,
      takerAmount,
      expiration: expiry,
      expiry,
      nonce,
      ethAmount,
      price,
      tokenSymbol,
      tokenAmount,
      tokenAddress,
      baseTokenAmount,
      baseTokenSymbol,
      tokenKind,
    }
  }
}

module.exports = new TokenMetadata()
