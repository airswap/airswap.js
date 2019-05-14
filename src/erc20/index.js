const ethers = require('ethers')
const ERC20abi = require('human-standard-token-abi')
const { TOKEN_APPROVAL_AMOUNT, TOKEN_APPROVAL_CHECK_AMOUNT, WETH_CONTRACT_ADDRESS, abis } = require('../constants')

function getERC20Contract(tokenAddress, signer) {
  return new ethers.Contract(tokenAddress, ERC20abi, signer)
}

function getWethContract(signer) {
  return new ethers.Contract(WETH_CONTRACT_ADDRESS, abis[WETH_CONTRACT_ADDRESS], signer)
}

function approveToken(tokenAddress, spender, signer) {
  const contract = getERC20Contract(tokenAddress, signer)
  return contract.approve(spender, TOKEN_APPROVAL_AMOUNT)
}

async function checkApproval(tokenAddress, spender, signer) {
  const contract = getERC20Contract(tokenAddress, signer)
  const address = await signer.getAddress()
  return contract
    .allowance(address, spender)
    .then(amount => Number(amount.toString()) > Number(TOKEN_APPROVAL_CHECK_AMOUNT))
}

function transfer(tokenAddress, to, amount, signer) {
  const contract = getERC20Contract(tokenAddress, signer)
  return contract.transfer(to, amount)
}

function wrapWeth(amount, signer) {
  const contract = getWethContract(signer)
  return contract.deposit({ value: ethers.utils.bigNumberify(amount) })
}

function unwrapWeth(amount, signer) {
  const contract = getWethContract(signer)
  return contract.withdraw(amount)
}

module.exports = { getERC20Contract, approveToken, checkApproval, transfer, wrapWeth, unwrapWeth }
