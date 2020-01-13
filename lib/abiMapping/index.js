"use strict";

var fs = require('fs');

var _ = require('lodash');

var indexer = require('./indexer');

var wrapper = require('./wrapper');

var swap = require('./swap');

var delegateFactory = require('./delegateFactory');

require('./delegate'); // delegate doesn't have a deployed contract addres, so no return valu


require('./indexContract');

var combined = _.mapValues({
  indexer: indexer,
  swap: swap,
  wrapper: wrapper,
  delegateFactory: delegateFactory
}, function (val) {
  return _.mapValues(val, function (address) {
    return address.toLowerCase();
  });
});

fs.writeFileSync("contractConstants.json", JSON.stringify(combined, null, 2));