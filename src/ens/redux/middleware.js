// import { getAddress, getName, setupENS } from '@ensdomains/ui'
// import { setENSReady, gotENSLookupError, gotENSLookupSuccess } from './actions'

// eslint-disable-next-line
export default function ensMiddleware(store) {
  // setupENS().then(() => store.dispatch(setENSReady()))
  return next => action => {
    switch (action.type) {
      case 'FIND_ADDRESS_BY_ENS_NAME':
        // const { name } = action
        // getAddress(name)
        //   .then(address => {
        //     store.dispatch(gotENSLookupSuccess(address, name))
        //   })
        //   .catch(e => {
        //     store.dispatch(gotENSLookupError(e.message))
        //   })
        next(action)
        break

      case 'FIND_ENS_NAME_BY_ADDRESS':
        // const { address } = action
        // getName(address)
        //   .then(ensName => {
        //     store.dispatch(gotENSLookupSuccess(address, ensName))
        //   })
        //   .catch(e => {
        //     store.dispatch(gotENSLookupError(e.message))
        //   })
        // next(action)
        break
      default:
    }
    return next(action)
  }
}
