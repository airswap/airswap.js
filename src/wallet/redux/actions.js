import { makePromiseAction } from '../../utils/redux'

/**
 * @typedef {('metamask' | 'portis' | 'privateKey' | 'web3')} WalletType
 * @description The type of wallet being connected
 * @memberof wallet
 */

export const initMetamask = () => connectWallet('metamask')

export const initPortis = () => connectWallet('portis')

export const initFortmatic = () => connectWallet('fortmatic')

export const initEqual = () => connectWallet('equal')

export const initMobileWallet = () => connectWallet('web3')

export const initPrivateKeySigner = () => connectWallet('privateKey')

export const initLedger = () => connectWallet('metamask', 'ledger')

export const initTrezor = () => connectWallet('metamask', 'trezor')

export const initWalletLink = () => connectWallet('walletLink')

export const clearWallet = () => ({
  type: 'CLEAR_WALLET',
})

export const connectWallet = (walletType, walletSubtype = '') => ({
  type: 'CONNECT_WALLET',
  walletType,
  walletSubtype,
})

export const getSigner = makePromiseAction({
  type: 'GET_SIGNER',
})
