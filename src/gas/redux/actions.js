/**
 * An action that can be dispatched to sets the current gas level
 * @function setGasLevel
 * @memberof gas
 * @param {('fast'|'fastest'|'safeLow'|'average')} level one of the four "levels" returned by Eth Gas Station
 */
export const setGasLevel = level => ({
  type: 'SET_GAS_LEVEL',
  level,
})
