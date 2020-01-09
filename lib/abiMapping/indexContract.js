"use strict";

var _ = require('lodash');

var fs = require('fs');

var _require = require('@airswap/indexer/build/contracts/Index'),
    abi = _require.abi;

var overwrites = [{
  inputs: [{
    name: 'identifier'
  }],
  name: 'entries'
}];

var newAbi = _.map(abi, function (abiItem) {
  var overwriteItem = _.find(overwrites, function (o) {
    return o.name === abiItem.name;
  });

  var newItem = _.merge(abiItem, overwriteItem);

  return newItem;
});

fs.writeFileSync("abis/index.json", JSON.stringify(newAbi, null, 2));
module.exports = {};