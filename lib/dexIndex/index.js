"use strict";

var fetch = require('isomorphic-fetch');

var _require = require('../constants'),
    DEXINDEX_URL = _require.DEXINDEX_URL;

function fetchDexIndexPrices(_ref) {
  var side = _ref.side,
      amount = _ref.amount,
      symbol = _ref.symbol;
  if (!side || !amount || !symbol) throw new Error('must specify side, amount, symbol');
  if (side !== 'buy' && side !== 'sell') throw new Error('side must be buy or sell');
  return new Promise(function (resolve, reject) {
    fetch("".concat(DEXINDEX_URL, "/").concat(side, "?symbol=").concat(symbol, "&amount=").concat(amount), {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(resolve);
  });
}

module.exports = {
  fetchDexIndexPrices: fetchDexIndexPrices
};