"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ethers = require('ethers');

var ERC20abi = require('human-standard-token-abi');

var _require = require('../constants'),
    TOKEN_APPROVAL_AMOUNT = _require.TOKEN_APPROVAL_AMOUNT,
    TOKEN_APPROVAL_CHECK_AMOUNT = _require.TOKEN_APPROVAL_CHECK_AMOUNT,
    WETH_CONTRACT_ADDRESS = _require.WETH_CONTRACT_ADDRESS,
    abis = _require.abis;

function getERC20Contract(tokenAddress, signer) {
  return new ethers.Contract(tokenAddress, ERC20abi, signer);
}

function getWethContract(signer) {
  return new ethers.Contract(WETH_CONTRACT_ADDRESS, abis[WETH_CONTRACT_ADDRESS], signer);
}

function approveToken(tokenAddress, spender, signer) {
  var contract = getERC20Contract(tokenAddress, signer);
  return contract.approve(spender, TOKEN_APPROVAL_AMOUNT);
}

function checkApproval(_x, _x2, _x3) {
  return _checkApproval.apply(this, arguments);
}

function _checkApproval() {
  _checkApproval = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(tokenAddress, spender, signer) {
    var contract, address;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contract = getERC20Contract(tokenAddress, signer);
            _context.next = 3;
            return signer.getAddress();

          case 3:
            address = _context.sent;
            return _context.abrupt("return", contract.allowance(address, spender).then(function (amount) {
              return Number(amount.toString()) > Number(TOKEN_APPROVAL_CHECK_AMOUNT);
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _checkApproval.apply(this, arguments);
}

function transfer(tokenAddress, to, amount, signer) {
  var contract = getERC20Contract(tokenAddress, signer);
  return contract.transfer(to, amount);
}

function wrapWeth(amount, signer) {
  var contract = getWethContract(signer);
  return contract.deposit({
    value: ethers.utils.bigNumberify(amount)
  });
}

function unwrapWeth(amount, signer) {
  var contract = getWethContract(signer);
  return contract.withdraw(amount);
}

module.exports = {
  getERC20Contract: getERC20Contract,
  approveToken: approveToken,
  checkApproval: checkApproval,
  transfer: transfer,
  wrapWeth: wrapWeth,
  unwrapWeth: unwrapWeth
};