import { fetchERC721KittyIndexToApproved, fetchERC721GetApproved } from './contractFunctionActions'
import { CRYPTO_KITTIES_CONTRACT_ADDRESS } from '../constants'

export const fetchERC721GetApprovedOverride = ({ contractAddress, tokenId }) =>
  contractAddress.toLowerCase() === CRYPTO_KITTIES_CONTRACT_ADDRESS
    ? fetchERC721GetApproved({ contractAddress, tokenId })
    : fetchERC721KittyIndexToApproved({ contractAddress, tokenId })
