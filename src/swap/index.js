const ethers = require('ethers')
const { SWAP_CONTRACT_ADDRESS, ETH_ADDRESS, abis } = require('../constants')

window.bignumberify = ethers.utils.bigNumberify

function getSwapContract(signer) {
  return new ethers.Contract(SWAP_CONTRACT_ADDRESS, abis[SWAP_CONTRACT_ADDRESS], signer)
}

function swap(order, signature, signer) {
  const contract = getSwapContract(signer)
  return contract.swap(order, signature, {
    value: ethers.utils.bigNumberify(order.taker.token === ETH_ADDRESS ? order.taker.param : 0),
  })
}

function swapSimple(order, signer) {
  const contract = getSwapContract(signer)
  return contract.swapSimple(
    order.id,
    order.makerWallet,
    order.makerParam,
    order.makerToken,
    order.takerWallet,
    order.takerParam,
    order.takerToken,
    order.expiry,
    order.v,
    order.r,
    order.s,
    {
      value: ethers.utils.bigNumberify(order.takerToken === ETH_ADDRESS ? order.takerParam : 0),
    },
  )
}

function cancel(ids, signer) {
  const contract = getSwapContract(signer)
  return contract.cancel(ids)
}

function signSimple(order, signer) {
  const { id, makerWallet, makerParam, makerToken, takerWallet, takerParam, takerToken, expiry } = order
  const hashedOrder = ethers.utils.solidityKeccak256(
    ['bytes1', 'address', 'uint256', 'address', 'uint256', 'address', 'address', 'uint256', 'address', 'uint256'],
    [
      '0x0',
      SWAP_CONTRACT_ADDRESS,
      id,
      makerWallet,
      makerParam, // erc20 AMOUNT of tokens or erc721 ID of NFT
      makerToken, // erc20 token contract address OR nft contract address
      takerWallet,
      takerParam, // erc20 AMOUNT of tokens or erc721 ID of NFT
      takerToken, // erc20 token contract address OR nft contract address
      expiry,
    ],
  )

  const signedMsg = signer.signMessage(ethers.utils.arrayify(hashedOrder))
  const sig = ethers.utils.splitSignature(signedMsg)

  return {
    id,
    makerWallet,
    makerParam,
    makerToken,
    takerWallet,
    takerParam,
    takerToken,
    expiry,
    ...sig,
  }
}

module.exports = { swap, swapSimple, cancel, signSimple }
