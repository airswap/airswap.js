import { makePromiseAction } from '../../utils/redux'

/**
 * @typedef {('metamask' | 'portis' | 'privateKey' | 'web3')} WalletType
 * @description The type of wallet being connected
 * @memberof wallet
 */

export const initMetamask = () => connectWallet({ walletType: 'metamask' })

export const initPortis = () => connectWallet({ walletType: 'portis' })

export const initFortmatic = () => connectWallet({ walletType: 'fortmatic' })

export const initEqual = () => connectWallet({ walletType: 'equal' })

export const initMobileWallet = () => connectWallet({ walletType: 'web3' })

export const initPrivateKeySigner = () => connectWallet({ walletType: 'privateKey' })

export const initLedger = () => connectWallet({ walletType: 'metamask', walletSubtype: 'ledger' })

export const initTrezor = () => connectWallet({ walletType: 'metamask', walletSubtype: 'trezor' })

export const initWalletLink = ({ walletAppLogo, walletAppName } = {}) =>
  connectWallet({ walletType: 'walletLink', walletAppLogo, walletAppName })

export const clearWallet = () => ({
  type: 'CLEAR_WALLET',
})

export const connectWallet = ({ walletType, walletSubtype = '', walletAppLogo, walletAppName }) => ({
  type: 'CONNECT_WALLET',
  walletType,
  walletSubtype,
  walletAppLogo,
  walletAppName,
})

export const getSigner = makePromiseAction({
  type: 'GET_SIGNER',
})
