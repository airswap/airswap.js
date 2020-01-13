"use strict";

var _ = require('lodash');

var fs = require('fs');

var _require = require('@airswap/indexer/build/contracts/Indexer.json'),
    abi = _require.abi;

var constants = require('@airswap/indexer/deploys.json');

var overwrites = [{
  inputs: [{
    name: 'signerToken'
  }, {
    name: 'senderToken'
  }, {
    name: 'protocol'
  }],
  name: 'indexes'
}, {
  inputs: [{
    name: 'protocol'
  }],
  name: 'locatorWhitelists'
}, {
  inputs: [{
    name: 'token'
  }],
  name: 'tokenBlacklist'
}];

var newAbi = _.map(abi, function (abiItem) {
  var overwriteItem = _.find(overwrites, function (o) {
    return o.name === abiItem.name;
  });

  var newItem = _.merge(abiItem, overwriteItem);

  return newItem;
});

fs.writeFileSync("abis/indexer.json", JSON.stringify(newAbi, null, 2));
module.exports = constants;