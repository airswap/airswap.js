"use strict";

var _abis;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var erc721 = require('./erc721');

var erc20 = require('./hst');

var astAbi = require('./AirSwapToken_rinkeby.json');

var wethAbi = require('./WETH_ABI.json');

var deltaBalancesABI = require('./deltaBalancesABI.json');

var pgpABI = require('./pgpABI.json');

var swap = require('./swap.json');

var swapLegacy = require('./SwapLegacy.json');

var delegateFactory = require('./delegateFactory.json');

var indexer = require('./indexer.json');

var cryptoKitties = require('./cryptoKitties.json');

var _require = require('../constants'),
    ENV = _require.ENV;

var wrapperABI = require('./wrapper');

var _require2 = require('../constants'),
    WETH_CONTRACT_ADDRESS = _require2.WETH_CONTRACT_ADDRESS,
    AST_CONTRACT_ADDRESS = _require2.AST_CONTRACT_ADDRESS,
    SWAP_CONTRACT_ADDRESS = _require2.SWAP_CONTRACT_ADDRESS,
    SWAP_LEGACY_CONTRACT_ADDRESS = _require2.SWAP_LEGACY_CONTRACT_ADDRESS,
    DELTA_BALANCES_CONTRACT_ADDRESS = _require2.DELTA_BALANCES_CONTRACT_ADDRESS,
    PGP_CONTRACT_ADDRESS = _require2.PGP_CONTRACT_ADDRESS,
    WRAPPER_CONTRACT_ADDRESS = _require2.WRAPPER_CONTRACT_ADDRESS,
    DELEGATE_FACTORY_CONTRACT_ADDRESS = _require2.DELEGATE_FACTORY_CONTRACT_ADDRESS,
    INDEXER_CONTRACT_ADDRESS = _require2.INDEXER_CONTRACT_ADDRESS;

var _require3 = require('../erc721/constants'),
    CRYPTO_KITTIES_CONTRACT_ADDRESS = _require3.CRYPTO_KITTIES_CONTRACT_ADDRESS;

var abis = (_abis = {}, _defineProperty(_abis, WETH_CONTRACT_ADDRESS, wethAbi), _defineProperty(_abis, AST_CONTRACT_ADDRESS, astAbi.abi), _defineProperty(_abis, SWAP_CONTRACT_ADDRESS, swap), _defineProperty(_abis, SWAP_LEGACY_CONTRACT_ADDRESS, swapLegacy.abi), _defineProperty(_abis, DELTA_BALANCES_CONTRACT_ADDRESS, deltaBalancesABI), _defineProperty(_abis, PGP_CONTRACT_ADDRESS, pgpABI), _defineProperty(_abis, WRAPPER_CONTRACT_ADDRESS, wrapperABI), _defineProperty(_abis, DELEGATE_FACTORY_CONTRACT_ADDRESS, delegateFactory), _defineProperty(_abis, INDEXER_CONTRACT_ADDRESS, indexer), _defineProperty(_abis, CRYPTO_KITTIES_CONTRACT_ADDRESS, ENV === 'production' ? cryptoKitties : erc721), _abis);
module.exports = {
  abis: abis,
  erc20: erc20,
  erc721: erc721,
  cryptoKitties: cryptoKitties
};