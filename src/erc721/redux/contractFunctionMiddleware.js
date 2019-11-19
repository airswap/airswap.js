// This file is generated code, edits will be overwritten

import * as contractFunctions from '../contractFunctions'
import resolveBigNumbers from '../../utils/resolveBigNumbers'

import { getSigner } from '../../wallet/redux/actions'

export default function ERC721Middleware(store) {
  return next => action => {
    switch (action.type) {
      case 'FETCH_ERC_721_SUPPORTS_INTERFACE':
        contractFunctions
          .getERC721SupportsInterface(action.contractAddress, action.interfaceId)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'supportsInterface',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, interfaceId: action.interfaceId },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_721_BALANCE_OF':
        contractFunctions
          .getERC721BalanceOf(action.contractAddress, action.owner)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'balanceOf',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_721_OWNER_OF':
        contractFunctions
          .getERC721OwnerOf(action.contractAddress, action.tokenId)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'ownerOf',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, tokenId: action.tokenId },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_721_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC721TransferFrom(
            action.contractAddress,
            action.from,
            action.to,
            action.tokenId,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC721',
            name: 'transferFrom',
            parameters: {
              contractAddress: action.contractAddress,
              from: action.from,
              to: action.to,
              tokenId: action.tokenId,
            },
          })
          action.resolve(id)
        })
        break
      case 'SUBMIT_ERC_721_APPROVE':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC721Approve(
            action.contractAddress,
            action.to,
            action.tokenId,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC721',
            name: 'approve',
            parameters: { contractAddress: action.contractAddress, to: action.to, tokenId: action.tokenId },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_721_GET_APPROVED':
        contractFunctions
          .getERC721GetApproved(action.contractAddress, action.tokenId)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'getApproved',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, tokenId: action.tokenId },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_721_SET_APPROVAL_FOR_ALL':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC721SetApprovalForAll(
            action.contractAddress,
            action.operator,
            action._approved,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC721',
            name: 'setApprovalForAll',
            parameters: {
              contractAddress: action.contractAddress,
              operator: action.operator,
              _approved: action._approved,
            },
          })
          action.resolve(id)
        })
        break
      case 'FETCH_ERC_721_IS_APPROVED_FOR_ALL':
        contractFunctions
          .getERC721IsApprovedForAll(action.contractAddress, action.owner, action.operator)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'isApprovedForAll',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, owner: action.owner, operator: action.operator },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'FETCH_ERC_721_KITTY_INDEX_TO_APPROVED':
        contractFunctions
          .getERC721KittyIndexToApproved(action.contractAddress, action.tokenId)
          .then(response => {
            store.dispatch({
              type: 'GOT_CALL_RESPONSE',
              response: resolveBigNumbers(response),
              namespace: 'ERC721',
              name: 'kittyIndexToApproved',
              timestamp: Date.now(),
              parameters: { contractAddress: action.contractAddress, tokenId: action.tokenId },
            })
            action.resolve(response)
          })
          .catch(action.reject)
        break
      case 'SUBMIT_ERC_721_SAFE_TRANSFER_FROM':
        store.dispatch(getSigner()).then(signer => {
          const contractFunctionPromise = contractFunctions.submitERC721SafeTransferFrom(
            action.contractAddress,
            action.from,
            action.to,
            action.tokenId,
            signer,
          )
          const id = Date.now().toString()
          store.dispatch({
            type: 'ADD_TRACKED_TRANSACTION',
            contractFunctionPromise,
            id,
            namespace: 'ERC721',
            name: 'safeTransferFrom',
            parameters: {
              contractAddress: action.contractAddress,
              from: action.from,
              to: action.to,
              tokenId: action.tokenId,
            },
          })
          action.resolve(id)
        })
        break
      default:
    }
    return next(action)
  }
}
