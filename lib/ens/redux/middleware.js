"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensMiddleware;

var _actions = require("./actions");

var _constants = require("../../constants");

// eslint-disable-next-line
function ensMiddleware(store) {
  store.dispatch((0, _actions.setENSReady)());
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'FIND_ADDRESS_BY_ENS_NAME':
          var name = action.name;

          _constants.httpProvider.resolveName(name).then(function (address) {
            if (!address || address === _constants.ENS_NULL_ADDRESS) {
              store.dispatch((0, _actions.gotENSLookupError)("Address not found for ".concat(name)));
            } else {
              store.dispatch((0, _actions.gotENSLookupSuccess)(address, name));
            }
          }).catch(function (e) {
            store.dispatch((0, _actions.gotENSLookupError)(e.message));
          });

          next(action);
          break;

        case 'FIND_ENS_NAME_BY_ADDRESS':
          var address = action.address;

          _constants.httpProvider.lookupAddress(address).then(function (ensName) {
            if (!ensName) {
              store.dispatch((0, _actions.gotENSLookupError)("Name not found for ".concat(address, "}")));
            } else {
              store.dispatch((0, _actions.gotENSLookupSuccess)(address, ensName));
            }
          }).catch(function (e) {
            store.dispatch((0, _actions.gotENSLookupError)(e.message));
          });

          next(action);
          break;

        default:
      }

      return next(action);
    };
  };
}