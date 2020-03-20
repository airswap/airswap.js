export const checkComplianceServiceWhitelist = ({ walletAddress, erc1155Address }) => ({
  type: 'CHECK_ERC_1155_COMPLIANCE_SERVICE_WHITELIST',
  walletAddress,
  erc1155Address,
})
