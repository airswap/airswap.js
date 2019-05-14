import { getLedgerAccount, makeLedgerProvider } from '../index'

export default function LedgerMiddleware() {
  return next => action => {
    switch (action.type) {
      case 'GET_HDW_CHAIN_KEY':
        if (action.walletType === 'ledger') {
          getLedgerAccount(action.path)
            .then(action.resolve)
            .catch(action.reject)
        }
        break
      case 'GET_LEDGER_PROVIDER':
        makeLedgerProvider(action.path)
          .then(action.resolve)
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
