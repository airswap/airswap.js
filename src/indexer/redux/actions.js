import { submitIndexerCreateIndex } from './contractFunctionActions'
import { INDEX_TYPES_LOOKUP } from '../constants'

export const createDelegateIndex = ({ signerToken, senderToken }) =>
  submitIndexerCreateIndex({ signerToken, senderToken, protocol: INDEX_TYPES_LOOKUP.contract })
