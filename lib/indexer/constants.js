"use strict";

var _ = require('lodash');

var INDEX_TYPES = {
  '0x0000': 'https',
  '0x0001': 'contract'
};

var INDEX_TYPES_LOOKUP = _.invert(INDEX_TYPES);

module.exports = {
  INDEX_TYPES: INDEX_TYPES,
  INDEX_TYPES_LOOKUP: INDEX_TYPES_LOOKUP
};