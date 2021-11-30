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
import { formatErrorMessage, getParsedInputFromTransaction } from '../../utils/transformations'
import { PORTIS_ID, AIRSWAP_LOGO_URL, ETH_NODE_HTTP, NETWORK, FORTMATIC_ID } from '../../constants'

import { web3WalletTypes } from '../static/constants'
import { connectWallet } from './actions'
import { getAbis } from '../../abis/redux/reducers'

export const connectedWallet = (walletType, address, walletSubtype) => ({
  type: 'CONNECTED_WALLET',
  walletType,
  walletSubtype,
  address,
})

export const errorConnectingWallet = error => ({
  type: 'ERROR_CONNECTING_WALLET',
  error,
})

let signer
let walletActions

const startWalletAction = async (store, actionType, argParams) => {
  const state = store.getState()
  const [args] = argParams
  const abis = getAbis(state)
  let params
  if (actionType === 'sendTransaction') {
    const to = await args.to
    const { data } = args

    params = getParsedInputFromTransaction({ to, data, value: '0' }, abis)

    store.dispatch({
      type: 'START_WALLET_ACTION',
      actionType,
      params,
    })

    let gasLimit = 300000 // a value left over frome trade-flow for all non-fills, has worked without issue

    if (params.name === 'fill' || params.name === 'swap') {
      const tokens = tokenSelectors.getTokens(state)
      const order = tokenSelectors.makeGetReadableOrder(state)(params.parameters)

      const { makerToken, takerToken } = order
      gasLimit = Math.max(
        ...[
          _.get(_.find(tokens, { address: makerToken }), 'gasLimit', 400000),
          _.get(_.find(tokens, { address: takerToken }), 'gasLimit', 400000),
        ].map(Number),
      )
    } else if (params.name === 'provideDelegateOrder' || params.name === 'provideOrder') {
      gasLimit = 400000
    } else if (params.name === 'setRuleAndIntent') {
      gasLimit = 500000
    } else if (params.name === 'createDelegate') {
      gasLimit = 2200000
    } else if (params.name === 'createIndex') {
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

let web3PollingInterval
function pollWeb3Address(address) {
  web3PollingInterval = window.setInterval(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if ((await provider.getSigner().getAddress()).toLowerCase() !== address.toLowerCase()) {
        window.location.reload()
      }
    }
  }, 3000) // If someone changes their account in metaMask, clear the app
}

// catch all connection function that will try to connect to any web3 wallet
// usually used for mobile wallets
function connectWeb3(store, walletType = 'web3', walletSubtype) {
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
        signer = getSigner({ web3Provider: window.ethereum }, walletActions, walletType, walletSubtype)
        const addressPromise = signer.getAddress()
        addressPromise.then(address => {
          pollWeb3Address(address.toLowerCase())
          store.dispatch(connectedWallet(walletType, address.toLowerCase(), walletSubtype))
        })
      })
      .catch(e => {
        store.dispatch(errorConnectingWallet(formatErrorMessage(e)))
      })
  } else if (window.web3) {
    signer = getSigner({ web3Provider: window.web3.currentProvider }, walletActions)
    const addressPromise = signer.getAddress()
    addressPromise.then(address => store.dispatch(connectedWallet(walletType, address.toLowerCase())))
  } else {
    store.dispatch(
      errorConnectingWallet(
        'This browser does not support ethereum wallets. Please use a web3 enabled mobile browser or try the desktop version of this website.',
      ),
    )
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
    nodeUrl: ETH_NODE_HTTP,
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

function connectWalletLink(store, walletAppLogo, walletAppName) {
  const walletLink = new WalletLink({
    appName: walletAppName || process.env.REACT_APP_NAME || 'AirSwap',
    appLogoUrl: walletAppLogo || AIRSWAP_LOGO_URL,
  })

  const provider = walletLink.makeWeb3Provider(ETH_NODE_HTTP, NETWORK)
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
  const walletsAvailable = {}
  web3WalletTypes.map(type => {
    let isAvailable = false
    switch (type) {
      case 'metamask':
        isAvailable = !!window.ethereum.isMetaMask && !isMobile.any
        break
      case 'trust':
        isAvailable = !!window.web3 && !!window.web3.currentProvider.isTrust
        break
      case 'cipher':
        isAvailable = !!window.web3 && window.web3.currentProvider.constructor.name === 'CipherProvider'
        break
      case 'status':
        isAvailable = !!window.web3 && !!window.web3.currentProvider.isStatus
        break
      case 'imtoken':
        isAvailable = !!window.imToken
        break
      case 'coinbase':
        isAvailable = !!window.web3 && !!window.web3.currentProvider.isToshi
        break
      case 'opera':
        isAvailable =
          ((!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) &&
          window.web3 &&
          window.web3.currentProvider &&
          window.web3.currentProvider.isConnected()
        break
      case 'equal':
        isAvailable = !!window.web3 && !!window.web3.currentProvider.isEQLWallet
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
            store.dispatch(
              connectWallet({
                walletType: expressLoginCredentials.walletType,
                walletSubtype: expressLoginCredentials.walletSubtype,
              }),
            )
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
              store.dispatch(
                connectWallet({
                  walletType: expressLoginCredentials.walletType,
                  walletSubtype: expressLoginCredentials.walletSubtype,
                }),
              )
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
        if (web3PollingInterval) {
          window.clearInterval(web3PollingInterval)
        }
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
            connectWeb3(store, 'metamask', action.walletSubtype)
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
          case 'trezor':
            // TODO: implement trezor conect
            // connectTrezor(store)
            break
          case 'walletLink':
            connectWalletLink(store, action.walletAppLogo, action.walletAppName)
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
