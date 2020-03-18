// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function ERC1155Middleware(store) {
  return next => action => {
    switch (action.type) {
      case 'SUBMIT_ERC_1155_SAFE_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC1155SafeTransferFrom(
            action.contractAddress,
            action.from,
            action.to,
            action.id,
            action.value,
            action.data,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC1155',
            name: 'safeTransferFrom',
            parameters: {
              contractAddress: action.contractAddress,
              from: action.from,
              to: action.to,
              id: action.id,
              value: action.value,
              data: action.data,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_ERC_1155_SAFE_BATCH_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC1155SafeBatchTransferFrom(
            action.contractAddress,
            action.from,
            action.to,
            action.ids,
            action.values,
            action.data,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC1155',
            name: 'safeBatchTransferFrom',
            parameters: {
              contractAddress: action.contractAddress,
              from: action.from,
              to: action.to,
              ids: action.ids,
              values: action.values,
              data: action.data,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_1155_BALANCE_OF':
        contractFunctions
          .getERC1155BalanceOf(action.contractAddress, action.owner, action.id)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC1155',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner, id: action.id },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_1155_BALANCE_OF_BATCH':
        contractFunctions
          .getERC1155BalanceOfBatch(action.contractAddress, action.owners, action.ids)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC1155',
              name: 'balanceOfBatch',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owners: action.owners, ids: action.ids },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_1155_SET_APPROVAL_FOR_ALL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC1155SetApprovalForAll(
            action.contractAddress,
            action.operator,
            action.approved,
            signer,
            action.options,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC1155',
            name: 'setApprovalForAll',
            parameters: {
              contractAddress: action.contractAddress,
              operator: action.operator,
              approved: action.approved,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_1155_IS_APPROVED_FOR_ALL':
        contractFunctions
          .getERC1155IsApprovedForAll(action.contractAddress, action.owner, action.operator)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC1155',
              name: 'isApprovedForAll',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner, operator: action.operator },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_1155_GET_COMPLIANCE_SERVICE':
        contractFunctions
          .getERC1155GetComplianceService(action.contractAddress)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC1155',
              name: 'getComplianceService',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      default:
    }
    return next(action)
  }
}
