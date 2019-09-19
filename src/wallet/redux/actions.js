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

export const initLedger = () => connectWallet('ledger')

export const initTrezor = () => connectWallet('trezor')

export const initWalletLink = () => connectWallet('walletLink')

export const clearWallet = () => ({
  type: 'CLEAR_WALLET',
})

export const connectWallet = (walletType, requireAuth = false) => ({
  type: 'CONNECT_WALLET',
  walletType,
  requireAuth,
})

export const getSigner = makePromiseAction({
  type: 'GET_SIGNER',
})
