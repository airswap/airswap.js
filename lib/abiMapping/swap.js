"use strict";

var _ = require('lodash');

var fs = require('fs');

var _require = require('@airswap/swap/build/contracts/Swap.json'),
    abi = _require.abi;

var constants = require('@airswap/swap/deploys.json');

var overwrites = [{
  inputs: [{
    name: 'authorizerAddress'
  }, {
    name: 'authorizedSender'
  }],
  name: 'senderAuthorizations'
}, {
  inputs: [{
    name: 'authorizerAddress'
  }, {
    name: 'authorizedSigner'
  }],
  name: 'signerAuthorizations'
}, {
  inputs: [{
    name: 'signer'
  }],
  name: 'signerMinimumNonce'
}, {
  inputs: [{
    name: 'signer'
  }, {
    name: 'nonce'
  }],
  name: 'signerNonceStatus'
}];

var newAbi = _.map(abi, function (abiItem) {
  var overwriteItem = _.find(overwrites, function (o) {
    return o.name === abiItem.name;
  });

  var newItem = _.merge(abiItem, overwriteItem);

  return newItem;
});

fs.writeFileSync("abis/swap.json", JSON.stringify(newAbi, null, 2));
module.exports = constants;