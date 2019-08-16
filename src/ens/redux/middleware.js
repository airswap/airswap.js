import { setENSReady, gotENSLookupError, gotENSLookupSuccess } from './actions'
import { httpProvider, ENS_NULL_ADDRESS } from '../../constants'

// eslint-disable-next-line
export default function ensMiddleware(store) {
  store.dispatch(setENSReady())
  return next => action => {
    switch (action.type) {
      case 'FIND_ADDRESS_BY_ENS_NAME':
        const { name } = action
        httpProvider
          .resolveName(name)
          .then(address => {
            if (!address || address === ENS_NULL_ADDRESS) {
              store.dispatch(gotENSLookupError(`Address not found for ${name}`))
            } else {
              store.dispatch(gotENSLookupSuccess(address, name))
            }
          })
          .catch(e => {
            store.dispatch(gotENSLookupError(e.message))
          })
        next(action)
        break

      case 'FIND_ENS_NAME_BY_ADDRESS':
        const { address } = action
        httpProvider
          .lookupAddress(address)
          .then(ensName => {
            if (!ensName) {
              store.dispatch(gotENSLookupError(`Name not found for ${address}}`))
            } else {
              store.dispatch(gotENSLookupSuccess(address, ensName))
            }
          })
          .catch(e => {
            store.dispatch(gotENSLookupError(e.message))
          })
        next(action)
        break
      default:
    }
    return next(action)
  }
}
