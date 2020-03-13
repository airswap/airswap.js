const fetch = require('isomorphic-fetch')
const BigNumber = require('bignumber.js')
const _ = require('lodash')
const { NETWORK, RINKEBY_ID, MAIN_ID, GOERLI_ID, KOVAN_ID, BASE_ASSET_TOKEN_ADDRESSES } = require('../constants')
const { flatten } = require('../swap/utils')

const TOKEN_METADATA_BASE_URL = 'https://token-metadata.airswap.io'

const OPENSEA_API_URL = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'https://rinkeby-api.opensea.io/api/v1'
    case MAIN_ID:
      return 'https://api.opensea.io/api/v1'
    case GOERLI_ID:
      return 'https://goerli-api.opensea.io/api/v1'
    case KOVAN_ID:
      return 'https://kovan-api.opensea.io/api/v1'
    default:
  }
})(NETWORK)

const TOKEN_LIST_URL = `${TOKEN_METADATA_BASE_URL}/${(N => {
  switch (N) {
    case RINKEBY_ID:
      return 'rinkebyTokens'
    case MAIN_ID:
      return 'tokens'
    case GOERLI_ID:
      return 'goerliTokens'
    case KOVAN_ID:
      return 'kovanTokens'
    default:
  }
})(NETWORK)}`

const MAX_DISPLAY_DECIMALS = 8
const makeCrawlTokenUrl = (address, forceAirswapUIApproved) =>
  `${TOKEN_METADATA_BASE_URL}/crawlTokenData?address=${address}${NETWORK === 4 ? '&test=true' : ''}${
    forceAirswapUIApproved ? '&forceAirswapUIApproved=true' : ''
  }`
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

function crawlToken(tokenAddress, forceUIApproval) {
  return new Promise((resolve, reject) => {
    fetch(makeCrawlTokenUrl(tokenAddress, forceUIApproval), {
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
const goerliTokens = [
  {
    airswapUI: 'yes',
    cmc_url: 'https://coinmarketcap.com/currencies/ethereum/',
    banned: false,
    security: false,
    colors: ['#262929', '#3c3c3c', '#444444', '#585c5c', '#838383'],
    symbol: 'ETH',
    cmc_id: '1027',
    cmc_img_url: 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
    decimals: '18',
    address: '0x0000000000000000000000000000000000000000',
    name: 'Ethereum',
  },
  {
    airswapUI: 'yes',
    cmc_url: 'https://coinmarketcap.com/currencies/weth/',
    banned: false,
    security: false,
    colors: ['#272929', '#404444', '#4c4c4c', '#5c5c5c', '#838383'],
    symbol: 'WETH',
    cmc_id: '2396',
    cmc_img_url: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2396.png',
    decimals: '18',
    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    name: 'WETH',
    airswap_img_url: 'https://airswap-token-images.s3.amazonaws.com/WETH.png',
  },
  {
    cmc_url: 'https://coinmarketcap.com/currencies/airswap/',
    symbol: 'AST',
    address: '0x1a1ec25dc08e98e5e93f1104b5e5cdd298707d31',
    airswap_img_url: 'https://airswap-token-images.s3.amazonaws.com/AST.png',
    decimals: '4',
    name: 'AirSwap',
    airswapUI: 'yes',
    banned: false,
    security: false,
    cmc_img_url: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2058.png',
    colors: ['#042165', '#1356e0', '#4c87fb', '#84acf4', '#fbfbfb'],
    cmc_id: '2058',
  },
  {
    symbol: 'dREC',
    address: '0xe7c1832b58e11964b2c39ed64fa197ca4e518810',
    airswap_img_url: 'https://strapi.allinfra.com/uploads/8d2263f7746a4f4b884189c4ada879a5.jpg',
    decimals: '0',
    name: 'dREC #1',
    airswapUI: 'yes',
    kind: 'ERC1155',
    banned: false,
    security: true,
    cmc_img_url: 'https://strapi.allinfra.com/uploads/8d2263f7746a4f4b884189c4ada879a5.jpg',
  },
  {
    airswapUI: 'yes',
    address: '0x61b6cc839a4a79c1ae0305b90f7a32e665616681',
    name: 'Dai',
    symbol: 'DAI',
    decimals: '18',
    airswap_img_url: 'https://airswap-token-images.s3.amazonaws.com/DAI.png',
    banned: false,
    colors: ['#f4dcc0', '#fbb029', '#fbfbfa', '#fcc66d', '#fcd492'],
    cmc_id: '2308',
    cmc_img_url: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2308.png',
    cmc_url: 'https://coinmarketcap.com/currencies/dai/',
  },
]

class TokenMetadata {
  constructor() {
    this.tokens = []
    this.nftItems = []
    this.ready =
      NETWORK === GOERLI_ID
        ? (async () => {
            this.setTokens(goerliTokens)
            return goerliTokens
          })()
        : fetchTokens().then(tokens => this.setTokens(tokens))
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
  crawlToken(address, forceUIApproval = false) {
    return crawlToken(address, forceUIApproval).then(token => {
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
      throw new Error(`token not in metadata, crawl before for next retry ${JSON.stringify(tokenQuery)}`)
    }
    const { decimals } = token
    return parseAmount(value, Math.min(Number(decimals), MAX_DISPLAY_DECIMALS))
  }
  formatAtomicValueByToken(tokenQuery, value) {
    const token = _.find(this.tokens, tokenQuery)
    if (!token) {
      throw new Error(`token not in metadata, crawl before for next retry ${JSON.stringify(tokenQuery)}`)
    }

    const { decimals } = token
    const power = 10 ** Number(decimals)
    return new BigNumber(value).times(power).toFixed(0)
  }
  formatFullValueByToken(tokenQuery, value) {
    const token = _.find(this.tokens, tokenQuery)
    if (!token) {
      throw new Error(`token not in metadata, crawl before for next retry ${JSON.stringify(tokenQuery)}`)
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
    const { makerAddress, makerToken, takerAddress, takerToken, expiration, nonce } = order
    let { takerAmount, makerAmount, takerAmountFormatted, makerAmountFormatted } = order
    const takerAmountFull = fullByToken({ address: takerToken }, takerAmount)
    const makerAmountFull = fullByToken({ address: makerToken }, makerAmount)

    if (takerAmount && makerAmount) {
      takerAmountFormatted = parseByToken({ address: takerToken }, takerAmountFull)
      makerAmountFormatted = parseByToken({ address: makerToken }, makerAmountFull)
    } else if (takerAmountFormatted && makerAmountFormatted) {
      takerAmount = this.formatAtomicValueByToken({ address: takerToken }, takerAmountFormatted)
      makerAmount = this.formatAtomicValueByToken({ address: makerToken }, makerAmountFormatted)
    }

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
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
      baseTokenAmount = takerAmountFormatted
      baseTokenAmountFull = takerAmountFull
      baseTokenSymbol = takerSymbol
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
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
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
      price = parseByToken({ symbol: takerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
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
  getReadableSwapOrder(
    orderParams,
    tokenByAddressParam,
    formatFullValueByTokenParam,
    parseValueByTokenParam,
    baseAsset,
  ) {
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

    if (baseAsset === takerToken) {
      baseTokenAmount = takerAmountFormatted
      baseTokenAmountFull = takerAmountFull
      baseTokenSymbol = takerSymbol
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
      tokenKind = makerKind
    } else if (baseAsset === makerToken) {
      baseTokenAmount = makerAmountFormatted
      baseTokenAmountFull = makerAmountFull
      baseTokenSymbol = makerSymbol
      tokenAmount = takerAmountFormatted
      tokenAmountFull = takerAmountFull
      tokenSymbol = takerSymbol
      tokenAddress = takerToken
      tokenKind = takerKind
    } else if (takerSymbol === 'ETH' || takerSymbol === 'WETH') {
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
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
      baseTokenAmount = takerAmountFormatted
      baseTokenAmountFull = takerAmountFull
      baseTokenSymbol = takerSymbol
      tokenAmount = makerAmountFormatted
      tokenAmountFull = makerAmountFull
      tokenSymbol = makerSymbol
      tokenAddress = makerToken
      tokenKind = makerKind
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
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
    if (baseAsset === takerToken) {
      price = parseByToken({ symbol: takerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (baseAsset === makerToken) {
      price = parseByToken({ symbol: makerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (takerSymbol === 'ETH' || takerSymbol === 'WETH' || makerSymbol === 'ETH' || makerSymbol === 'WETH') {
      price = parseByToken({ symbol: 'ETH' }, new BigNumber(ethAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(takerToken)) {
      price = parseByToken({ symbol: takerSymbol }, new BigNumber(baseTokenAmountFull).div(tokenAmountFull).toString())
    } else if (BASE_ASSET_TOKEN_ADDRESSES.includes(makerToken)) {
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
