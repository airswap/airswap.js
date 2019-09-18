import { createSelector } from 'reselect'
import { getERC721OwnerOf, getERC721GetApproved, getERC721KittyIndexToApproved } from './callDataSelectors'
import { getERC721ApproveTransactions } from './contractTransactionSelectors'
import { SWAP_CONTRACT_ADDRESS } from '../../constants'
import { getConnectedWalletAddress } from '../../wallet/redux/reducers'

export const makeGetERC721Owner = createSelector(getERC721OwnerOf, values => (contractAddress, tokenId) => {
  const owner = values.find(
    callData =>
      callData.name === 'ownerOf' &&
      callData.parameters.contractAddress === contractAddress &&
      callData.parameters.tokenId === tokenId,
  )
  if (owner) return owner.response
})

export const makeGetIsERC721Owner = createSelector(
  getERC721OwnerOf,
  getConnectedWalletAddress,
  (values, connectedWalletAddress) => (contractAddress, tokenId) => {
    const owner = values.find(
      callData =>
        callData.name === 'ownerOf' &&
        callData.parameters.contractAddress === contractAddress &&
        callData.parameters.tokenId === tokenId,
    )
    if (owner) return owner.response.toLowerCase() === connectedWalletAddress.toLowerCase()
    return false
  },
)

export const makeGetIsERC721Approved = createSelector(
  getERC721GetApproved,
  getERC721KittyIndexToApproved,
  (values, kittyValues) => (contractAddress, tokenId) => {
    const approvedAddress = [...values, ...kittyValues].find(
      callData =>
        (callData.name === 'getApproved' || callData.name === 'kittyIndexToApproved') &&
        callData.parameters.contractAddress === contractAddress &&
        callData.parameters.tokenId === tokenId,
    )
    return approvedAddress && approvedAddress.response.toLowerCase() === SWAP_CONTRACT_ADDRESS
  },
)

export const makeGetERC721ApproveTransaction = createSelector(
  getERC721ApproveTransactions,
  values => (contractAddress, tokenId) =>
    values.find(
      callData =>
        callData.name === 'approve' &&
        callData.parameters.contractAddress === contractAddress &&
        callData.parameters.tokenId === tokenId,
    ),
)
