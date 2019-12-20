import _ from 'lodash'
import isMobile from 'ismobilejs'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import WalletLink from 'walletlink'
import { ethers } from 'ethers'
import { selectors as tokenSelectors } from '../../tokens/redux'
import { selectors as gasSelectors } from '../../gas/redux'
import { selectors as walletSelectors } from './reducers'
import getSigner from '../getSigner'
import { formatErrorMessage } from '../../utils/transformations'
import {
  PORTIS_ID,
  AIRSWAP_LOGO_URL,
  AIRSWAP_GETH_NODE_ADDRESS,
  NETWORK,
  FORTMATIC_ID,
  NODESMITH_GETH_NODE,
} from '../../constants'
import { web3WalletTypes } from '../static/constants'
import { getLedgerProvider } from '../../ledger/redux/actions'
import { initializeHDW } from '../../HDW/redux/actions'
import { connectWallet } from './actions'
import { getAbis } from '../../abis/redux/reducers'

export const connectedWallet = (walletType, address) => ({
  type: 'CONNECTED_WALLET',
  walletType,
  address,
})

export const errorConnectingWallet = error => ({
  type: 'ERROR_CONNECTING_WALLET',
  error,
})

let signer
let walletActions

async function connectLedger(store) {
  store
    .dispatch(initializeHDW('ledger'))
    .then(async ({ path }) => {
      let ledgerProvider
      try {
        ledgerProvider = await store.dispatch(getLedgerProvider(path))
      } catch (e) {
        return Promise.reject(e)
      }

      ledgerProvider.isMetaMask = true //eslint-disable-line
      ledgerProvider.isLedger = true //eslint-disable-line
      signer = getSigner({ web3Provider: ledgerProvider }, walletActions)
      const addressPromise = signer.getAddress()
      addressPromise.then(address => store.dispatch(connectedWallet('ledger', address.toLowerCase())))
    })
    .catch(e => store.dispatch(errorConnectingWallet(formatErrorMessage(e))))
}

const startWalletAction = async (store, actionType, argParams) => {
  const state = store.getState()
  const [args] = argParams
  const abis = getAbis(state)
  let params
  if (actionType === 'sendTransaction') {
    const to = await args.to
    const contractInterface = new ethers.utils.Interface(abis[to.toLowerCase()])
    const { data } = args
    const parsed = contractInterface.parseTransaction({ data })
    const parametersValues = _.map(parsed.args, s => (s.toString ? s.toString() : s).toLowerCase())
    const parameters = _.zipObject(
      _.find(contractInterface.abi, { name: parsed.name }).inputs.map(({ name }) => name),
      parametersValues,
    )
    params = {
      name: parsed.name,
      parameters,
      to: to.toLowerCase(),
    }

    store.dispatch({
      type: 'START_WALLET_ACTION',
      actionType,
      params,
    })

    let gasLimit = 300000 // a value left over frome trade-flow for all non-fills, has worked without issue
    if (parsed.name === 'fill' || parsed.name === 'swap') {
      const tokens = tokenSelectors.getTokens(state)
      const order = tokenSelectors.makeGetReadableOrder(state)(parameters)

      const { tokenAddress } = order
      gasLimit = _.get(_.find(tokens, { address: tokenAddress }), 'gasLimit', 400000)
    } else if (parsed.name === 'setRuleAndIntent') {
      gasLimit = 500000
    } else if (parsed.name === 'createDelegate') {
      gasLimit = 3000000
    } else if (parsed.name === 'createIndex') {
      gasLimit = 1500000
    }

    const { gwei } = gasSelectors.getCurrentGasPriceSettings(state)

    const gasPrice = ethers.utils.parseUnits(`${gwei}`, 'gwei').toNumber()
    return {
      gasLimit: Number(gasLimit),
      gasPrice,
    }
  } else if (actionType === 'signMessage') {
    params = { signatureText: args }
    store.dispatch({
      type: 'START_WALLET_ACTION',
      actionType,
      params,
    })
  } else if (actionType === 'signTypedData') {
    params = { signatureText: args }
    store.dispatch({
      type: 'START_WALLET_ACTION',
      actionType,
      params,
    })
  }
}

const finishWalletAction = (store, actionType, params) =>
  store.dispatch({
    type: 'FINISH_WALLET_ACTION',
    actionType,
    params,
  })

// catch all connection function that will try to connect to any web3 wallet
// usually used for mobile wallets
function connectWeb3(store, walletType = 'web3') {
  const availableWallets = walletSelectors.getAvailableWalletState(store.getState())
  if (!availableWallets[walletType] && walletType !== 'web3') {
    store.dispatch(errorConnectingWallet(`${walletType} not detected in browser.`))
    return
  }
  if (window.ethereum) {
    window.ethereum.isMetaMask = true
    window.ethereum
      .enable()
      .then(() => {
        signer = getSigner({ web3Provider: window.ethereum }, walletActions, walletType)
        const addressPromise = signer.getAddress()
        addressPromise.then(address => store.dispatch(connectedWallet(walletType, address.toLowerCase())))
      })
      .catch(e => {
        store.dispatch(errorConnectingWallet(formatErrorMessage(e)))
      })
  } else if (window.web3) {
    signer = getSigner({ web3Provider: window.web3.currentProvider }, walletActions)
    const addressPromise = signer.getAddress()
    addressPromise.then(address => store.dispatch(connectedWallet(walletType, address.toLowerCase())))
  } else {
    store.dispatch(errorConnectingWallet('No enabled web3 found in browser'))
  }
}

function connectPrivateKey(store) {
  if (process.env.REACT_APP_PRIVATE_KEY) {
    signer = getSigner({ privateKey: process.env.REACT_APP_PRIVATE_KEY }, walletActions)
    window.setTimeout(() => store.dispatch(connectedWallet('privateKey', signer.address.toLowerCase()))) // window.timeout is needed because of redux restriction where triggered middleware events show up before originating middleware events
  } else {
    store.dispatch(errorConnectingWallet('privateKey not in env variables'))
  }
}

function connectPortis(store) {
  const portisConfig = {
    nodeUrl: AIRSWAP_GETH_NODE_ADDRESS,
    chainId: NETWORK,
    nodeProtocol: 'rpc',
  }
  const portis = new Portis(PORTIS_ID, portisConfig)
  window.portis = portis
  portis.onLogin(() => {
    signer = getSigner({ web3Provider: { ...portis.provider, isMetaMask: true } }, walletActions) // need to tell ethers.js this is metamask because this line will cause bugs otherwise https://github.com/ethers-io/ethers.js/blob/061b0eae1d4c570aedd9bee1971afa43fcdae1a6/src.ts/providers/web3-provider.ts#L61
    const addressPromise = signer.getAddress()
    addressPromise.then(address => {
      store.dispatch(connectedWallet('portis', address.toLowerCase()))
    })
  })
  portis.showPortis()
}

function connectFortmatic(store) {
  const fm = new Fortmatic(FORTMATIC_ID)
  const provider = fm.getProvider()
  provider.enable().then(() => {
    signer = getSigner({ web3Provider: provider }, walletActions)
    const addressPromise = signer.getAddress()
    addressPromise
      .then(address => {
        store.dispatch(connectedWallet('fortmatic', address.toLowerCase()))
      })
      .catch(e => store.dispatch(errorConnectingWallet(e)))
  })
}

function connectWalletLink(store) {
  const walletLink = new WalletLink({
    appName: process.env.REACT_APP_NAME || 'AirSwap',
    appLogoUrl: AIRSWAP_LOGO_URL,
  })

  const provider = walletLink.makeWeb3Provider(NODESMITH_GETH_NODE, NETWORK)
  provider.enable().then(() => {
    signer = getSigner({ web3Provider: provider }, walletActions)
    const addressPromise = signer.getAddress()
    addressPromise
      .then(address => {
        store.dispatch(connectedWallet('walletLink', address.toLowerCase()))
      })
      .catch(e => store.dispatch(errorConnectingWallet(e)))
  })
}

const detectWeb3Wallets = async store => {
  const prevWalletsAvailable = walletSelectors.getAvailableWalletState(store.getState())
  if (window && !window.web3) {
    // No web3 wallets;
    return null
  }
  const walletsAvailable = {}
  web3WalletTypes.map(type => {
    let isAvailable = false
    switch (type) {
      case 'metamask':
        isAvailable =
          !!window.web3.currentProvider.isMetaMask && !isMobile.any && !window.web3.currentProvider.isEQLWallet
        break
      case 'trust':
        isAvailable = !!window.web3.currentProvider.isTrust
        break
      case 'cipher':
        isAvailable = window.web3.currentProvider.constructor.name === 'CipherProvider'
        break
      case 'status':
        isAvailable = !!window.web3.currentProvider.isStatus
        break
      case 'imtoken':
        isAvailable = !!window.imToken
        break
      case 'coinbase':
        isAvailable = !!window.web3.currentProvider.isToshi
        break
      case 'opera':
        isAvailable =
          ((!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) &&
          window.web3 &&
          window.web3.currentProvider &&
          window.web3.currentProvider.isConnected()
        break
      case 'equal':
        isAvailable = !!window.web3.currentProvider.isEQLWallet
        break
      case 'walletLink':
        isAvailable = !!window.WalletLink && !!window.WalletLinkProvider
        break
      default:
        isAvailable = false
    }
    walletsAvailable[type] = isAvailable
    return walletsAvailable
  })
  if (!_.isEqual(prevWalletsAvailable, walletsAvailable)) {
    store.dispatch({
      type: 'SET_WALLET_AVAILABILITY',
      wallets: walletsAvailable,
    })
  }
  return walletsAvailable
}

function attemptExpressLogin(store) {
  const state = store.getState()
  const availableWallets = walletSelectors.getAvailableWalletState(state)
  const expressLoginCredentials = walletSelectors.getExpressLoginCredentials(state)
  if (!_.some(availableWallets) || _.isEmpty(expressLoginCredentials)) {
    // don't attempt auto-login if no wallets are currently available
    // don't attempt auto-login if no credentials are stored
    return
  }
  if (availableWallets[expressLoginCredentials.walletType]) {
    try {
      switch (
        expressLoginCredentials.walletType // this switch statement allows us to write adaptors to determine wallet availability
      ) {
        case 'equal':
          const res = window.ethereum.send({ method: 'eth_accounts' })
          if ((_.first(res.result) || '').toLowerCase() === expressLoginCredentials.address) {
            store.dispatch(connectWallet(expressLoginCredentials.walletType))
          }
          break
        default:
          window.ethereum.send({ method: 'eth_accounts' }, (err, resp) => {
            if (err) {
              return err
            }
            const address = _.first(_.get(resp, 'result'))
            if (!address) {
              return 'address not found'
            }
            if (address.toLowerCase() === expressLoginCredentials.address) {
              store.dispatch(connectWallet(expressLoginCredentials.walletType))
            }
          })
      }
    } catch (e) {
      console.log('Auto Log-In Failed', e)
    }
  }
}

export default function walletMiddleware(store) {
  detectWeb3Wallets(store).then(availableWallets => attemptExpressLogin(store, availableWallets))
  window.setInterval(() => detectWeb3Wallets(store), 5000)
  walletActions = _.mapValues({ startWalletAction, finishWalletAction }, action => _.partial(action, store))
  return next => action => {
    switch (action.type) {
      case 'GET_SIGNER':
        if (signer) {
          action.resolve(signer)
        } else {
          action.reject('wallet not initialized')
        }
        next(action)
        break
      case 'CLEAR_WALLET':
        signer = undefined
        next(action)
        break
      case 'KEYSPACE_INIT_ERROR':
        signer = undefined
        store.dispatch(errorConnectingWallet(action.error))
        next(action)
        break
      case 'ERROR_CONNECTING_ROUTER':
        signer = undefined
        store.dispatch(errorConnectingWallet(action.error))
        next(action)
        break
      case 'CONNECT_WALLET':
        next(action)
        switch (action.walletType) {
          case 'metamask':
            connectWeb3(store, 'metamask')
            break
          case 'privateKey':
            connectPrivateKey(store)
            break
          case 'portis':
            connectPortis(store)
            break
          case 'fortmatic':
            connectFortmatic(store)
            break
          case 'equal':
            connectWeb3(store, 'equal')
            break
          case 'web3':
            connectWeb3(store)
            break
          case 'ledger':
            connectLedger(store)
            break
          case 'trezor':
            // TODO: implement trezor conect
            // connectTrezor(store)
            break
          case 'walletLink':
            connectWalletLink(store)
            break
          default:
            throw new Error(`${action.walletType} walletType not expected in wallet middleware`)
        }
        break
      case 'SET_WALLET_AVAILABILITY':
        next(action)
        attemptExpressLogin(store)
        break
      case 'REDUX_STORAGE_LOAD':
        next(action)
        attemptExpressLogin(store)
        break
      default:
        next(action)
    }
  }
}
