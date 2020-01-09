"use strict";

var fetch = require('isomorphic-fetch');

var _require = require('../constants'),
    GET_TOKEN_PRICE_URL = _require.GET_TOKEN_PRICE_URL;

function fetchTokenPrice() {
  return new Promise(function (resolve, reject) {
    fetch(GET_TOKEN_PRICE_URL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(function (_ref) {
      var response = _ref.response;
      resolve(response);
    });
  });
}

module.exports = {
  fetchTokenPrice: fetchTokenPrice
};