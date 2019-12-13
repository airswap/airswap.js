const erc721 = require('./erc721')
const erc20 = require('./hst')
const astAbi = require('./AirSwapToken_rinkeby.json')
const wethAbi = require('./WETH_ABI.json')
const deltaBalancesABI = require('./deltaBalancesABI.json')
const pgpABI = require('./pgpABI.json')
const swap = require('./swap.json')
const swapLegacy = require('./SwapLegacy.json')
const delegateFactory = require('./delegateFactory.json')
const indexer = require('./indexer.json')
const cryptoKitties = require('./cryptoKitties.json')
const { ENV } = require('../constants')

const wrapperABI = require('./wrapper')
const {
  WETH_CONTRACT_ADDRESS,
  AST_CONTRACT_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
  SWAP_LEGACY_CONTRACT_ADDRESS,
  DELTA_BALANCES_CONTRACT_ADDRESS,
  PGP_CONTRACT_ADDRESS,
  WRAPPER_CONTRACT_ADDRESS,
  DELEGATE_FACTORY_CONTRACT_ADDRESS,
  INDEXER_CONTRACT_ADDRESS,
} = require('../constants')

const { CRYPTO_KITTIES_CONTRACT_ADDRESS } = require('../erc721/constants')

const abis = {
  [WETH_CONTRACT_ADDRESS]: wethAbi,
  [AST_CONTRACT_ADDRESS]: astAbi.abi,
  [SWAP_CONTRACT_ADDRESS]: swap,
  [SWAP_LEGACY_CONTRACT_ADDRESS]: swapLegacy.abi,
  [DELTA_BALANCES_CONTRACT_ADDRESS]: deltaBalancesABI,
  [PGP_CONTRACT_ADDRESS]: pgpABI,
  [WRAPPER_CONTRACT_ADDRESS]: wrapperABI,
  [DELEGATE_FACTORY_CONTRACT_ADDRESS]: delegateFactory,
  [INDEXER_CONTRACT_ADDRESS]: indexer,
  [CRYPTO_KITTIES_CONTRACT_ADDRESS]: ENV === 'production' ? cryptoKitties : erc721,
}

module.exports = { abis, erc20, erc721, cryptoKitties }
