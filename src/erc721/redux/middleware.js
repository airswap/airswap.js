import { makeMiddlewareEthersTransactionsFn } from '../../utils/redux/templates/ethersTransactions'

async function approveERC721() {
  console.log('Approve Token')
}

export default function erc721Middleware(store) {
  return next => action => {
    switch (action.type) {
      case 'SUBMIT_ERC_721_APPROVE':
        makeMiddlewareEthersTransactionsFn(
          approveERC721,
          'approveToken',
          store,
          action,
          `${action.contractAddress},${action.tokenId}`,
        )
        break
      default:
    }
    return next(action)
  }
}
