import { makePromiseAction } from '../../utils/redux'

export const getKeySpace = makePromiseAction({
  type: 'GET_KEYSPACE',
})

export const initializeKeySpace = makePromiseAction({
  type: 'INITIALIZE_KEYSPACE',
})
