import { SWAP_CONTRACT_ADDRESS } from '../../constants'
import { fetchERC721KittyIndexToApproved, fetchERC721GetApproved, submitERC721Approve } from './contractFunctionActions'
import { CRYPTO_KITTIES_CONTRACT_ADDRESS } from '../constants'

export const fetchERC721GetApprovedOverride = ({ contractAddress, tokenId }) =>
  contractAddress.toLowerCase() === CRYPTO_KITTIES_CONTRACT_ADDRESS
    ? fetchERC721KittyIndexToApproved({ contractAddress, tokenId })
    : fetchERC721GetApproved({ contractAddress, tokenId })

export const approveERC721 = (tokenAddress, tokenId) =>
  submitERC721Approve({
    contractAddress: tokenAddress,
    tokenId,
    to: SWAP_CONTRACT_ADDRESS,
  })
