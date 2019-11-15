import KeySpace from '../index'
import { getSigner } from '../../wallet/redux/actions'
import { formatErrorMessage } from '../../utils/transformations'
import { selectors } from './reducers'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'
import { selectors as protocolMessagingSelectors } from '../../protocolMessaging/redux/reducers'
import { IS_EXPLORER, IS_INSTANT } from '../../constants'

let keySpace

async function initialzeKeySpace(store) {
  const signer = await store.dispatch(getSigner())
  const signedSeed = selectors.getSignedSeed(store.getState())
  const onRequestSignedSeed = seed => store.dispatch({ type: 'REQUEST_SIGNED_SEED', seed })
  const onGeneratedSignedSeed = signedSeed => store.dispatch({ type: 'GENERATED_SIGNED_SEED', signedSeed }) // eslint-disable-line
  const onRequestPGPKeyPair = address => store.dispatch({ type: 'REQUEST_PGP_KEY_PAIR', address })
  const onGeneratedPGPKeyPair = keyPair => store.dispatch({ type: 'GENERATED_PGP_KEY_PAIR', keyPair })
  keySpace = new KeySpace({
    signer,
    signedSeed,
    onRequestSignedSeed,
    onGeneratedSignedSeed,
    onRequestPGPKeyPair,
    onGeneratedPGPKeyPair,
  })
  window.keySpace = keySpace
  return keySpace.setUpPGP()
}

export default function keySpaceMiddleware(store) {
  return next => action => {
    switch (action.type) {
      case 'CONNECTED_WALLET':
        if (protocolMessagingSelectors.getRouterRequireAuth(store.getState()) && (IS_INSTANT || IS_EXPLORER)) {
          store.dispatch({ type: 'INITIALIZE_KEYSPACE' })
        }
        break
      case 'INITIALIZE_KEYSPACE':
        initialzeKeySpace(store)
          .then(() => {
            store.dispatch({ type: 'KEYSPACE_READY' })
            const connectedAddress = getConnectedWalletAddress(store.getState())
            store.dispatch({ type: 'SET_SIGNED_SEED', signedSeed: keySpace.signedSeed, address: connectedAddress })
          })
          .catch(error => store.dispatch({ type: 'KEYSPACE_INIT_ERROR', error: formatErrorMessage(error) }))
        break
      case 'GET_KEYSPACE':
        if (keySpace.initialized) {
          action.resolve(keySpace)
        } else {
          action.reject('KeySpace not initialized')
        }
        break
      case 'GET_PGP_SIGNATURE':
        keySpace
          .sign(action.text)
          .then(action.resolve)
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
