export const checkAllInfraWhitelist = ({ walletAddress, erc1155Address }) => ({
  type: 'CHECK_ERC_1155_ALLINFRA_WHITELIST',
  walletAddress,
  erc1155Address,
})
