"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGasLevel = void 0;

/**
 * An action that can be dispatched to sets the current gas level
 * @function setGasLevel
 * @memberof gas
 * @param {('fast'|'fastest'|'safeLow'|'average')} level one of the four "levels" returned by Eth Gas Station
 */
var setGasLevel = function setGasLevel(level) {
  return {
    type: 'SET_GAS_LEVEL',
    level: level
  };
};

exports.setGasLevel = setGasLevel;