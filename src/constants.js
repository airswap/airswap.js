const ethers = require('ethers')
const _ = require('lodash')
const ERC20abi = require('human-standard-token-abi')
const astAbi = require('./abis/AirSwapToken_rinkeby.json')
const wethAbi = require('./abis/WETH_ABI.json')
const deltaBalancesABI = require('./abis/deltaBalancesABI.json')
const pgpABI = require('./abis/pgpABI.json')
const swap = require('./abis/Swap.json')
const swapLegacy = require('./abis/SwapLegacy.json')

const ENV =
  process.env.REACT_APP_ENVIRONMENT ||
  process.env.REACT_APP_SERVER_ENV ||
  process.env.ENV ||
  process.env.STAGE ||
  process.env.STORYBOOK_AIRSWAP_ENV ||
  'production'

const MAIN_ID = 1
const RINKEBY_ID = 4
const KOVAN_ID = 42

const NETWORK_MAPPING = {
  [MAIN_ID]: 'Mainnet',
  [RINKEBY_ID]: 'Rinkeby',
  [KOVAN_ID]: 'Kovan',
}

const NAME_MAPPING = {
  [RINKEBY_ID]: 'rinkeby',
  [KOVAN_ID]: 'kovan',
}

const SWAP_CONTRACT_MAPPING = {
  [MAIN_ID]: '0x54d2690e97e477a4b33f40d6e4afdd4832c07c57',
  [RINKEBY_ID]: '0x78db49d0459a67158bdca6e161be3d90342c7247',
}

const SWAP_LEGACY_CONTRACT_MAPPING = {
  [MAIN_ID]: '0x8fd3121013a07c57f0d69646e86e7a4880b467b7',
  [RINKEBY_ID]: '0x07fc7c43d8168a2730344e5cf958aaecc3b42b41',
}

const NETWORK = (N => {
  switch (N) {
    case 'development':
      return RINKEBY_ID
    case 'sandbox':
      return RINKEBY_ID
    case 'staging':
      return MAIN_ID
    case 'production':
      return MAIN_ID
    default:
      return RINKEBY_ID
  }
})(ENV)

const NETWORK_NAME = NAME_MAPPING[NETWORK]

const SWAP_CONTRACT_ADDRESS = SWAP_CONTRACT_MAPPING[NETWORK]

const SWAP_LEGACY_CONTRACT_ADDRESS = SWAP_LEGACY_CONTRACT_MAPPING[NETWORK]

const AST_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8'
    case MAIN_ID:
      return '0x27054b13b1b798b345b591a4d22e6562d47ea75a'
    default:
  }
})(NETWORK)

const PGP_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0x9d7efd45e45c575cafb25d49d43556f43ebe3456'
    case MAIN_ID:
      return '0xa6a52efd0e0387756bc0ef10a34dd723ac408a30'
    default:
  }
})(NETWORK)

const ENS_NULL_ADDRESS = '0x00000000000000000000000000000000'
const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'

const WETH_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0xc778417e063141139fce010982780140aa0cd5ab'
    case MAIN_ID:
      return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    default:
  }
})(NETWORK)

const ETH_BASE_ADDRESSES = [ETH_ADDRESS, WETH_CONTRACT_ADDRESS]

const DAI_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0xce787654722aed819d7a8073576d2b2b359641b5'
    case MAIN_ID:
      return '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
    default:
  }
})(NETWORK)

const DEXINDEX_URL = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'https://ethereum-dex-prices-service.development.airswap.io'
    case MAIN_ID:
      return 'https://ethereum-dex-prices-service.production.airswap.io'
    default:
      return 'https://ethereum-dex-prices-service.production.airswap.io'
  }
})(NETWORK)

const DELTA_BALANCES_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0xa1e2c4132cbd33c3876e1254143a850466c97e32'
    case MAIN_ID:
      return '0x5dfe850d4b029c25c7ef9531ec9986c97d90300f'
    default:
  }
})(NETWORK)

const AIRSWAP_GETH_NODE_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'https://geth-rinkeby.airswap-api.com'
    case MAIN_ID:
      return 'https://geth-cluster.airswap-api.com'
    default:
  }
})(NETWORK)

const INFURA_GETH_NODE = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'https://rinkeby.infura.io/8LNJeV3XEJUtC5YzpkF6'
    case MAIN_ID:
      return 'https://mainnet.infura.io/8LNJeV3XEJUtC5YzpkF6'
    default:
  }
})(NETWORK)

const NODESMITH_GETH_NODE = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc?apiKey=9e06e7c1681b470ab1021f64938bf831'
    case MAIN_ID:
      return 'https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc?apiKey=9e06e7c1681b470ab1021f64938bf831'
    default:
  }
})(NETWORK)

const httpProvider = new ethers.providers.JsonRpcProvider(AIRSWAP_GETH_NODE_ADDRESS)

const INDEXER_ADDRESS = ETH_ADDRESS

const baseAbis = {
  [WETH_CONTRACT_ADDRESS]: wethAbi,
  [AST_CONTRACT_ADDRESS]: astAbi.abi,
  [SWAP_CONTRACT_ADDRESS]: swap,
  [SWAP_LEGACY_CONTRACT_ADDRESS]: swapLegacy.abi,
  [DELTA_BALANCES_CONTRACT_ADDRESS]: deltaBalancesABI,
  [PGP_CONTRACT_ADDRESS]: pgpABI,
}

const abis = new Proxy(baseAbis, {
  // info about proxies here: https://stackoverflow.com/questions/7891937/is-it-possible-to-implement-dynamic-getters-setters-in-javascript
  get(target, name) {
    return target[name] || ERC20abi
  },
})

const TOKEN_APPROVAL_AMOUNT = '90071992547409910000000000'

const TOKEN_APPROVAL_CHECK_AMOUNT = '50071992547409910000000000'

const ENV_URL_SNIPPET = ENV === 'production' ? '' : `.${ENV}`

const DEFAULT_SERVER_URL = ENV_URL_SNIPPET ? `//connect${ENV_URL_SNIPPET}.airswap.io/` : `//connect.airswap.io/`

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || DEFAULT_SERVER_URL

const AIRSWAP_API_URL = `https://api${ENV_URL_SNIPPET}.airswap.io/`

const MAKER_STATS_URL = `https://maker-stats${ENV_URL_SNIPPET}.airswap.io/`

const BASE_ASSET_TOKENS_SYMBOLS = ['ETH', 'WETH', 'DAI']

const MAX_DISPLAY_DECIMALS = 8

const IPFS_URL = 'https://ipfs.infura.io:5001'

const SLS_PGP_URL =
  process.env.REACT_APP_SLS_PGP_URL ||
  (_.includes(['development', 'sandbox'], ENV) ? `https://pgp.${ENV}.airswap.io` : 'https://pgp.airswap.io')

const GAS_URL = 'https://ethgasstation.airswap.io/ethgasAPI.json'

/**
 * @constant
 * @memberOf gas
 * @default
 */
const GAS_LEVELS = ['fast', 'fastest', 'safeLow', 'average']

const GAS_LIMITS = {
  exchangeFill: '200000',
  wethWithdrawal: '160000',
  wethDeposit: '160000',
  approve: '160000',
}

/**
 * @typedef currencySymbol
 * @description Symbol of currency with which to display prices in the application
 * @memberof fiat
 * @type {('USD'|'EUR'|'GBP'|'CNY')}
 */

/**
 * @constant fiatCurrencies
 * @description To add new currencies to libraries, add them here with the abbreviation as the key ('USD') and the symbol as the value ('$')
 * @memberOf fiat
 * @default
 */
const FIAT_CURRENCIES = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr.',
}

const GET_TOKEN_PRICE_URL = `${MAKER_STATS_URL}getEthPrices`

const keyspaceDefaultSeedFn = address => `I'm generating my encryption keys for AirSwap ${address}`
const keyspaceSignatureTextFn = ipfsKeyHash => `IPFS location of my Keyspace identity: ${ipfsKeyHash}`

const AIRSWAP_HEADLESS_API = `https://headless${ENV_URL_SNIPPET}.airswap.io/`
const AIRSWAP_HEADLESS_API_SSE = `${AIRSWAP_HEADLESS_API}stream/`

const PORTIS_ID = '691c65e3-ef26-4e6a-9a91-cdc772ed2298'

const ESAN_MAKER_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0x6cc47be912a07fbe9cebe68c9e103fdf123b7269'
    case MAIN_ID:
      return '0x1550d41be3651686e1aeeea073d8d403d0bd2e30'
    default:
  }
})(NETWORK)

const NODESMITH_KEY = process.env.REACT_APP_NODESMITH_KEY || process.env.NODESMITH_KEY
const NODESMITH_URL = `wss://ethereum.api.nodesmith.io/v1/${NETWORK_NAME ||
  'mainnet'}/jsonrpc/ws?apiKey=${NODESMITH_KEY}`

const FORTMATIC_ID = (N => {
  switch (N) {
    case RINKEBY_ID:
      return 'pk_test_8514D52FEE94B0E1'
    case MAIN_ID:
      return 'pk_live_C61C451FE2415771'
    default:
  }
})(NETWORK)

const IS_INSTANT = process.env.REACT_APP_INSTANT

module.exports = {
  ENV,
  MAIN_ID,
  RINKEBY_ID,
  KOVAN_ID,
  NETWORK_MAPPING,
  NAME_MAPPING,
  SWAP_LEGACY_CONTRACT_MAPPING,
  NETWORK,
  NETWORK_NAME,
  SWAP_LEGACY_CONTRACT_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
  AST_CONTRACT_ADDRESS,
  PGP_CONTRACT_ADDRESS,
  ETH_ADDRESS,
  ENS_NULL_ADDRESS,
  WETH_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS,
  DELTA_BALANCES_CONTRACT_ADDRESS,
  AIRSWAP_GETH_NODE_ADDRESS,
  INFURA_GETH_NODE,
  abis,
  TOKEN_APPROVAL_AMOUNT,
  TOKEN_APPROVAL_CHECK_AMOUNT,
  BASE_ASSET_TOKENS_SYMBOLS,
  MAX_DISPLAY_DECIMALS,
  ERC20abi,
  REACT_APP_SERVER_URL,
  AIRSWAP_API_URL,
  DEXINDEX_URL,
  IPFS_URL,
  SLS_PGP_URL,
  INDEXER_ADDRESS,
  ETH_BASE_ADDRESSES,
  GET_TOKEN_PRICE_URL,
  GAS_URL,
  GAS_LEVELS,
  GAS_LIMITS,
  FIAT_CURRENCIES,
  keyspaceDefaultSeedFn,
  keyspaceSignatureTextFn,
  AIRSWAP_HEADLESS_API,
  AIRSWAP_HEADLESS_API_SSE,
  PORTIS_ID,
  ESAN_MAKER_ADDRESS,
  MAKER_STATS_URL,
  NODESMITH_KEY,
  NODESMITH_URL,
  FORTMATIC_ID,
  IS_INSTANT,
  httpProvider,
  NODESMITH_GETH_NODE,
}
