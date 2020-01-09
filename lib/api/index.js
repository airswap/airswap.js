"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var qs = require('querystring');

var uuid = require('uuid4');

var EventSource = require('eventsource');

var fetch = require('isomorphic-fetch');

var _require = require('../constants'),
    REACT_APP_SERVER_URL = _require.REACT_APP_SERVER_URL,
    AIRSWAP_API_URL = _require.AIRSWAP_API_URL,
    AIRSWAP_HEADLESS_API_SSE = _require.AIRSWAP_HEADLESS_API_SSE,
    MAKER_STATS_URL = _require.MAKER_STATS_URL,
    AIRSWAP_HEADLESS_API = _require.AIRSWAP_HEADLESS_API;

var prefix = typeof window !== 'undefined' ? window.location.protocol : 'https:';

function fetchRouterConnectedUsers() {
  return new Promise(function (resolve, reject) {
    fetch("".concat(prefix).concat(REACT_APP_SERVER_URL, "users"), {
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

function fetchIndexerIntents() {
  return new Promise(function (resolve, reject) {
    fetch("".concat(AIRSWAP_API_URL, "intents/expanded"), {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json().then(function (intents) {
        return intents.map(function (intent) {
          return _objectSpread({}, intent, {
            makerAddress: intent.address
          });
        });
      });
    }).then(resolve);
  });
}

function fetchConnectedIntents() {
  return Promise.all([fetchIndexerIntents(), fetchRouterConnectedUsers()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        intents = _ref2[0],
        connectedUsers = _ref2[1];

    return _.filter(intents, function (_ref3) {
      var makerAddress = _ref3.makerAddress;
      return _.includes(connectedUsers, makerAddress);
    });
  });
}

function fetchQuotes() {
  return new Promise(function (resolve, reject) {
    fetch("".concat(MAKER_STATS_URL, "getQuotes"), {
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

function fetchMaxQuotes() {
  return new Promise(function (resolve, reject) {
    fetch("".concat(MAKER_STATS_URL, "getMaxQuotes"), {
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

function formatQueryArrayKeys(queryArray) {
  return _.uniqBy(queryArray.map(function (q) {
    return _.omit(_.mapKeys(q, function (value, key) {
      switch (key) {
        case 'makerToken':
          return 'mt';

        case 'takerToken':
          return 'tt';

        case 'makerAmount':
          return 'ma';

        case 'takerAmount':
          return 'ta';

        default:
          return key;
      }
    }), 'makerAddress');
  }), function (value) {
    return "".concat(value.mt).concat(value.tt);
  }).map(function (q) {
    return _objectSpread({}, q, {
      id: uuid()
    });
  });
}

function fetchQuotesSSE(queryArray, onMessageCallback) {
  var msgCount = 0;
  var formattedQueryArray = formatQueryArrayKeys(queryArray);
  var queryURL = encodeURI("".concat(AIRSWAP_HEADLESS_API_SSE, "getQuotes?params=").concat(JSON.stringify(formattedQueryArray)));
  var evtSource = new EventSource(queryURL);

  evtSource.onmessage = function (e) {
    onMessageCallback(e.data);
    msgCount++;

    if (msgCount === queryArray.length) {
      evtSource.close();
    }
  };
}

function fetchHeadlessOrders(_ref4) {
  var makerToken = _ref4.makerToken,
      takerToken = _ref4.takerToken,
      makerAmount = _ref4.makerAmount,
      takerAddress = _ref4.takerAddress,
      timeoutSeconds = _ref4.timeoutSeconds;

  var queryObj = _.pickBy({
    makerToken: makerToken,
    takerToken: takerToken,
    makerAmount: makerAmount,
    takerAddress: takerAddress,
    timeoutSeconds: timeoutSeconds
  }, _.identity); // removes falsey values from object


  var queryURL = "".concat(AIRSWAP_HEADLESS_API, "getOrders?").concat(qs.stringify(queryObj));
  return new Promise(function (resolve, reject) {
    return fetch(queryURL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(function (resp) {
      return resolve(resp);
    });
  });
}

function fetchHeadlessQuotes(_ref5) {
  var makerToken = _ref5.makerToken,
      takerToken = _ref5.takerToken,
      makerAmount = _ref5.makerAmount,
      timeoutSeconds = _ref5.timeoutSeconds;

  var queryObj = _.pickBy({
    makerToken: makerToken,
    takerToken: takerToken,
    makerAmount: makerAmount,
    timeoutSeconds: timeoutSeconds
  }, _.identity); // removes falsey values from object


  var queryURL = "".concat(AIRSWAP_HEADLESS_API, "getQuotes?").concat(qs.stringify(queryObj));
  return new Promise(function (resolve, reject) {
    return fetch(queryURL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(function (resp) {
      return resolve(resp);
    });
  });
}

function fetchHeadlessMaxQuotes(_ref6) {
  var makerToken = _ref6.makerToken,
      takerToken = _ref6.takerToken,
      timeoutSeconds = _ref6.timeoutSeconds;

  var queryObj = _.pickBy({
    makerToken: makerToken,
    takerToken: takerToken,
    timeoutSeconds: timeoutSeconds
  }, _.identity); // removes falsey values from object


  var queryURL = "".concat(AIRSWAP_HEADLESS_API, "getMaxQuotes?").concat(qs.stringify(queryObj));
  return new Promise(function (resolve, reject) {
    return fetch(queryURL, {
      method: 'get',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        reject(response.statusText);
      }

      return response.json();
    }).then(function (resp) {
      return resolve(resp);
    });
  });
}

module.exports = {
  fetchRouterConnectedUsers: fetchRouterConnectedUsers,
  fetchIndexerIntents: fetchIndexerIntents,
  fetchQuotes: fetchQuotes,
  fetchMaxQuotes: fetchMaxQuotes,
  fetchQuotesSSE: fetchQuotesSSE,
  formatQueryArrayKeys: formatQueryArrayKeys,
  fetchConnectedIntents: fetchConnectedIntents,
  fetchHeadlessOrders: fetchHeadlessOrders,
  fetchHeadlessQuotes: fetchHeadlessQuotes,
  fetchHeadlessMaxQuotes: fetchHeadlessMaxQuotes
};