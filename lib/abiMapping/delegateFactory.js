"use strict";

var _ = require('lodash');

var fs = require('fs');

var _require = require('@airswap/delegate/build/contracts/DelegateFactory.json'),
    abi = _require.abi;

var constants = require('@airswap/delegate/deploys.json');

var overwrites = [];

var newAbi = _.map(abi, function (abiItem) {
  var overwriteItem = _.find(overwrites, function (o) {
    return o.name === abiItem.name;
  });

  var newItem = _.merge(abiItem, overwriteItem);

  return newItem;
});

fs.writeFileSync("abis/delegateFactory.json", JSON.stringify(newAbi, null, 2));
module.exports = constants;