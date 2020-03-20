// This file is generated code, edits will be overwritten
export const fetchComplianceServiceIsWhitelisted = ({ contractAddress, account }) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch({
      contractAddress,
      account,
      type: 'FETCH_COMPLIANCE_SERVICE_IS_WHITELISTED',
      resolve,
      reject,
    }),
  )
