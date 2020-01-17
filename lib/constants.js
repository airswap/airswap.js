"use strict";

var _NETWORK_MAPPING, _NAME_MAPPING, _SWAP_LEGACY_CONTRACT, _baseAbis;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('dotenv').config({
  path: "".concat(__dirname, "/../.env")
});

var ethers = require('ethers');

var _ = require('lodash');

var _require = require('@alch/alchemy-web3'),
    createAlchemyWeb3 = _require.createAlchemyWeb3;

var ERC20abi = require('human-standard-token-abi');

var astAbi = require('./abis/AirSwapToken_rinkeby.json');

var wethAbi = require('./abis/WETH_ABI.json');

var deltaBalancesABI = require('./abis/deltaBalancesABI.json');

var pgpABI = require('./abis/pgpABI.json');

var swap = require('./abis/swap.json');

var swapLegacy = require('./abis/SwapLegacy.json');

var delegateFactoryABI = require('./abis/delegateFactory.json');

var wrapperABI = require('./abis/wrapper.json');

var RetryProvider = require('./utils/retryProvider');

var contractConstants = require('./contractConstants.json');

var JEST_IS_TESTING = process.env.JEST_WORKER_ID !== undefined;
var IS_TESTING = JEST_IS_TESTING || process.env.MOCHA_IS_TESTING || process.env.REACT_APP_TESTING;
var NO_ALCHEMY_WEBSOCKETS = process.env.HTTPS_GETH_ONLY || process.env.REACT_APP_HTTPS_GETH_ONLY || IS_TESTING;
var ENV = process.env.REACT_APP_ENVIRONMENT || process.env.REACT_APP_SERVER_ENV || process.env.ENV || process.env.STAGE || process.env.STORYBOOK_AIRSWAP_ENV || 'production';
var MAIN_ID = 1;
var RINKEBY_ID = 4;
var KOVAN_ID = 42;
var NETWORK_MAPPING = (_NETWORK_MAPPING = {}, _defineProperty(_NETWORK_MAPPING, MAIN_ID, 'Mainnet'), _defineProperty(_NETWORK_MAPPING, RINKEBY_ID, 'Rinkeby'), _defineProperty(_NETWORK_MAPPING, KOVAN_ID, 'Kovan'), _NETWORK_MAPPING);
var NAME_MAPPING = (_NAME_MAPPING = {}, _defineProperty(_NAME_MAPPING, RINKEBY_ID, 'rinkeby'), _defineProperty(_NAME_MAPPING, KOVAN_ID, 'kovan'), _NAME_MAPPING);
var SWAP_LEGACY_CONTRACT_MAPPING = (_SWAP_LEGACY_CONTRACT = {}, _defineProperty(_SWAP_LEGACY_CONTRACT, MAIN_ID, '0x8fd3121013a07c57f0d69646e86e7a4880b467b7'), _defineProperty(_SWAP_LEGACY_CONTRACT, RINKEBY_ID, '0x07fc7c43d8168a2730344e5cf958aaecc3b42b41'), _SWAP_LEGACY_CONTRACT);

var NETWORK = function (N) {
  switch (N) {
    case 'development':
      return RINKEBY_ID;

    case 'sandbox':
      return RINKEBY_ID;

    case 'staging':
      return MAIN_ID;

    case 'production':
      return MAIN_ID;

    default:
      return RINKEBY_ID;
  }
}(ENV);

var NETWORK_NAME = NAME_MAPPING[NETWORK];
var SWAP_CONTRACT_ADDRESS = contractConstants.swap[String(NETWORK)];

var SWAP_CONTRACT_DEPLOY_BLOCK = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 5359808;

    case MAIN_ID:
      return 8574958;

    default:
  }
}(NETWORK);

var SWAP_LEGACY_CONTRACT_ADDRESS = SWAP_LEGACY_CONTRACT_MAPPING[NETWORK];
var TRADER_AFFILIATE_ADDRESS = '0xff98f0052bda391f8fad266685609ffb192bef25';

var AST_CONTRACT_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return '0xcc1cbd4f67cceb7c001bd4adf98451237a193ff8';

    case MAIN_ID:
      return '0x27054b13b1b798b345b591a4d22e6562d47ea75a';

    default:
  }
}(NETWORK);

var PGP_CONTRACT_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return '0x9d7efd45e45c575cafb25d49d43556f43ebe3456';

    case MAIN_ID:
      return '0xa6a52efd0e0387756bc0ef10a34dd723ac408a30';

    default:
  }
}(NETWORK);

var WRAPPER_CONTRACT_ADDRESS = contractConstants.wrapper[String(NETWORK)];
var INDEXER_CONTRACT_ADDRESS = contractConstants.indexer[String(NETWORK)];

var INDEXER_CONTRACT_DEPLOY_BLOCK = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 5626023;

    case MAIN_ID:
      return 9005083;

    default:
  }
}(NETWORK);

var DELEGATE_FACTORY_CONTRACT_ADDRESS = contractConstants.delegateFactory[String(NETWORK)];

var DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 5626024;

    case MAIN_ID:
      return 9006065;

    default:
  }
}(NETWORK);

var ENS_NULL_ADDRESS = '0x00000000000000000000000000000000';
var ETH_ADDRESS = '0x0000000000000000000000000000000000000000';

var WETH_CONTRACT_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return '0xc778417e063141139fce010982780140aa0cd5ab';

    case MAIN_ID:
      return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

    default:
  }
}(NETWORK);

var ETH_BASE_ADDRESSES = [ETH_ADDRESS, WETH_CONTRACT_ADDRESS];

var DAI_CONTRACT_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return '0xce787654722aed819d7a8073576d2b2b359641b5';

    case MAIN_ID:
      return '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359';

    default:
  }
}(NETWORK);

var DEXINDEX_URL = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 'https://ethereum-dex-prices-service.development.airswap.io';

    case MAIN_ID:
      return 'https://ethereum-dex-prices-service.production.airswap.io';

    default:
      return 'https://ethereum-dex-prices-service.production.airswap.io';
  }
}(NETWORK);

var DELTA_BALANCES_CONTRACT_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return '0xa1e2c4132cbd33c3876e1254143a850466c97e32';

    case MAIN_ID:
      return '0x5dfe850d4b029c25c7ef9531ec9986c97d90300f';

    default:
  }
}(NETWORK);

var ALCHEMY_RINKEBY_ID = process.env.REACT_APP_ALCHEMY_RINKEBY_ID || process.env.ALCHEMY_RINKEBY_ID || 'SSm9sKBkb_vOyLjf5yXNGQ4QsBAeqm1S';
var ALCHEMY_MAINNET_ID = process.env.REACT_APP_ALCHEMY_MAINNET_ID || process.env.ALCHEMY_MAINNET_ID || '1e8iSwEIqstMQtW1133tjieia8pkQ4a8';

var AIRSWAP_GETH_NODE_ADDRESS = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return "https://eth-rinkeby.alchemyapi.io/jsonrpc/".concat(ALCHEMY_RINKEBY_ID);

    case MAIN_ID:
      return "https://eth-mainnet.alchemyapi.io/jsonrpc/".concat(ALCHEMY_MAINNET_ID);

    default:
  }
}(NETWORK);

var ALCHEMY_WEBSOCKET_URL = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return "wss://eth-rinkeby.ws.alchemyapi.io/ws/".concat(ALCHEMY_RINKEBY_ID);

    case MAIN_ID:
      return "wss://eth-mainnet.ws.alchemyapi.io/ws/".concat(ALCHEMY_MAINNET_ID);

    default:
  }
}(NETWORK);

var INFURA_GETH_NODE = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 'https://rinkeby.infura.io/8LNJeV3XEJUtC5YzpkF6';

    case MAIN_ID:
      return 'https://mainnet.infura.io/8LNJeV3XEJUtC5YzpkF6';

    default:
  }
}(NETWORK);

var alchemyWeb3 = NO_ALCHEMY_WEBSOCKETS ? null : createAlchemyWeb3(ALCHEMY_WEBSOCKET_URL);
var httpProviderUrl = process.env.MOCHA_IS_TESTING || process.env.REACT_APP_TESTING ? 'http://localhost:8545' : AIRSWAP_GETH_NODE_ADDRESS;
var httpProvider = new RetryProvider(httpProviderUrl, NETWORK);
var infuraProvider = new RetryProvider(INFURA_GETH_NODE, NETWORK); // alchemy provider has built in retry
// https://github.com/alchemyplatform/alchemy-web3

var alchemyWebsocketProvider = NO_ALCHEMY_WEBSOCKETS ? null : new ethers.providers.Web3Provider(alchemyWeb3.currentProvider);
var INDEXER_ADDRESS = ETH_ADDRESS;
var baseAbis = (_baseAbis = {}, _defineProperty(_baseAbis, WETH_CONTRACT_ADDRESS, wethAbi), _defineProperty(_baseAbis, AST_CONTRACT_ADDRESS, astAbi.abi), _defineProperty(_baseAbis, SWAP_CONTRACT_ADDRESS, swap), _defineProperty(_baseAbis, SWAP_LEGACY_CONTRACT_ADDRESS, swapLegacy.abi), _defineProperty(_baseAbis, DELTA_BALANCES_CONTRACT_ADDRESS, deltaBalancesABI), _defineProperty(_baseAbis, PGP_CONTRACT_ADDRESS, pgpABI), _defineProperty(_baseAbis, WRAPPER_CONTRACT_ADDRESS, wrapperABI), _defineProperty(_baseAbis, DELEGATE_FACTORY_CONTRACT_ADDRESS, delegateFactoryABI), _baseAbis);
var abis = new Proxy(baseAbis, {
  // info about proxies here: https://stackoverflow.com/questions/7891937/is-it-possible-to-implement-dynamic-getters-setters-in-javascript
  get: function get(target, name) {
    return target[name] || ERC20abi;
  }
});
var TOKEN_APPROVAL_AMOUNT = '90071992547409910000000000';
var TOKEN_APPROVAL_CHECK_AMOUNT = '50071992547409910000000000';
var ENV_URL_SNIPPET = ENV === 'production' ? '' : ".".concat(ENV);
var DEFAULT_SERVER_URL = ENV_URL_SNIPPET ? "//connect".concat(ENV_URL_SNIPPET, ".airswap.io/") : "//connect.airswap.io/";
var REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || DEFAULT_SERVER_URL;
var AIRSWAP_API_URL = "https://api".concat(ENV_URL_SNIPPET, ".airswap.io/");
var MAKER_STATS_URL = "https://maker-stats".concat(ENV_URL_SNIPPET, ".airswap.io/");
var BASE_ASSET_TOKENS_SYMBOLS = ['ETH', 'WETH', 'DAI', 'SAI', 'USDC', 'TUSD', 'TCAD', 'TGBP', 'THKD', 'TAUD', 'WBTC', 'USDT'];
var MAX_DISPLAY_DECIMALS = 8;
var IPFS_URL = 'https://ipfs.infura.io:5001';
var SLS_PGP_URL = process.env.REACT_APP_SLS_PGP_URL || (_.includes(['development', 'sandbox'], ENV) ? "https://pgp.".concat(ENV, ".airswap.io") : 'https://pgp.airswap.io');
var GAS_URL = 'https://ethgasstation.airswap.io/ethgasAPI.json';
var AIRSWAP_LOGO_URL = 'https://www.airswap.io/favicon.png';
/**
 * @constant
 * @memberOf gas
 * @default
 */

var GAS_LEVELS = ['fast', 'fastest', 'safeLow', 'average'];
var GAS_LIMITS = {
  exchangeFill: '200000',
  wethWithdrawal: '160000',
  wethDeposit: '160000',
  approve: '160000'
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

};
var FIAT_CURRENCIES = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr.'
};
var GET_TOKEN_PRICE_URL = "".concat(MAKER_STATS_URL, "getEthPrices");
var AIRSWAP_HEADLESS_API = "https://headless".concat(ENV_URL_SNIPPET, ".airswap.io/");
var AIRSWAP_HEADLESS_API_SSE = "".concat(AIRSWAP_HEADLESS_API, "stream/");
var PORTIS_ID = '691c65e3-ef26-4e6a-9a91-cdc772ed2298';

var FORTMATIC_ID = function (N) {
  switch (N) {
    case RINKEBY_ID:
      return 'pk_test_8514D52FEE94B0E1';

    case MAIN_ID:
      return 'pk_live_C61C451FE2415771';

    default:
  }
}(NETWORK);

var IS_INSTANT = process.env.REACT_APP_INSTANT;
var IS_EXPLORER = process.env.REACT_APP_EXPLORER;
var INFINITE_EXPIRY = 253395176400; // 10/10/9999

var INDEX_HEAD = '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF';
var PROTOCOL_0 = '0x0000';
var PROTOCOL_1 = '0x0001';
var PROTOCOL_2 = '0x0002';
module.exports = {
  ENV: ENV,
  MAIN_ID: MAIN_ID,
  RINKEBY_ID: RINKEBY_ID,
  KOVAN_ID: KOVAN_ID,
  NETWORK_MAPPING: NETWORK_MAPPING,
  AIRSWAP_LOGO_URL: AIRSWAP_LOGO_URL,
  TRADER_AFFILIATE_ADDRESS: TRADER_AFFILIATE_ADDRESS,
  NAME_MAPPING: NAME_MAPPING,
  SWAP_LEGACY_CONTRACT_MAPPING: SWAP_LEGACY_CONTRACT_MAPPING,
  NETWORK: NETWORK,
  NETWORK_NAME: NETWORK_NAME,
  SWAP_LEGACY_CONTRACT_ADDRESS: SWAP_LEGACY_CONTRACT_ADDRESS,
  SWAP_CONTRACT_ADDRESS: SWAP_CONTRACT_ADDRESS,
  SWAP_CONTRACT_DEPLOY_BLOCK: SWAP_CONTRACT_DEPLOY_BLOCK,
  AST_CONTRACT_ADDRESS: AST_CONTRACT_ADDRESS,
  PGP_CONTRACT_ADDRESS: PGP_CONTRACT_ADDRESS,
  ETH_ADDRESS: ETH_ADDRESS,
  ENS_NULL_ADDRESS: ENS_NULL_ADDRESS,
  WETH_CONTRACT_ADDRESS: WETH_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS: DAI_CONTRACT_ADDRESS,
  DELTA_BALANCES_CONTRACT_ADDRESS: DELTA_BALANCES_CONTRACT_ADDRESS,
  AIRSWAP_GETH_NODE_ADDRESS: AIRSWAP_GETH_NODE_ADDRESS,
  INFURA_GETH_NODE: INFURA_GETH_NODE,
  abis: abis,
  TOKEN_APPROVAL_AMOUNT: TOKEN_APPROVAL_AMOUNT,
  TOKEN_APPROVAL_CHECK_AMOUNT: TOKEN_APPROVAL_CHECK_AMOUNT,
  BASE_ASSET_TOKENS_SYMBOLS: BASE_ASSET_TOKENS_SYMBOLS,
  MAX_DISPLAY_DECIMALS: MAX_DISPLAY_DECIMALS,
  ERC20abi: ERC20abi,
  REACT_APP_SERVER_URL: REACT_APP_SERVER_URL,
  AIRSWAP_API_URL: AIRSWAP_API_URL,
  DEXINDEX_URL: DEXINDEX_URL,
  IPFS_URL: IPFS_URL,
  SLS_PGP_URL: SLS_PGP_URL,
  INDEXER_ADDRESS: INDEXER_ADDRESS,
  ETH_BASE_ADDRESSES: ETH_BASE_ADDRESSES,
  GET_TOKEN_PRICE_URL: GET_TOKEN_PRICE_URL,
  GAS_URL: GAS_URL,
  GAS_LEVELS: GAS_LEVELS,
  GAS_LIMITS: GAS_LIMITS,
  FIAT_CURRENCIES: FIAT_CURRENCIES,
  AIRSWAP_HEADLESS_API: AIRSWAP_HEADLESS_API,
  AIRSWAP_HEADLESS_API_SSE: AIRSWAP_HEADLESS_API_SSE,
  PORTIS_ID: PORTIS_ID,
  MAKER_STATS_URL: MAKER_STATS_URL,
  FORTMATIC_ID: FORTMATIC_ID,
  IS_INSTANT: IS_INSTANT,
  IS_EXPLORER: IS_EXPLORER,
  httpProvider: httpProvider,
  infuraProvider: infuraProvider,
  WRAPPER_CONTRACT_ADDRESS: WRAPPER_CONTRACT_ADDRESS,
  INFINITE_EXPIRY: INFINITE_EXPIRY,
  ALCHEMY_WEBSOCKET_URL: ALCHEMY_WEBSOCKET_URL,
  alchemyWeb3: alchemyWeb3,
  alchemyWebsocketProvider: alchemyWebsocketProvider,
  INDEXER_CONTRACT_ADDRESS: INDEXER_CONTRACT_ADDRESS,
  DELEGATE_FACTORY_CONTRACT_ADDRESS: DELEGATE_FACTORY_CONTRACT_ADDRESS,
  INDEXER_CONTRACT_DEPLOY_BLOCK: INDEXER_CONTRACT_DEPLOY_BLOCK,
  INDEX_HEAD: INDEX_HEAD,
  DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK: DELEGATE_FACTORY_CONTRACT_DEPLOY_BLOCK,
  PROTOCOL_0: PROTOCOL_0,
  PROTOCOL_1: PROTOCOL_1,
  PROTOCOL_2: PROTOCOL_2,
  NO_ALCHEMY_WEBSOCKETS: NO_ALCHEMY_WEBSOCKETS
};