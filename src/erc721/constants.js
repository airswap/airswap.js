const { RINKEBY_ID, MAIN_ID, NETWORK } = require('../constants')

const CRYPTO_KITTIES_CONTRACT_ADDRESS = (N => {
  switch (N) {
    case RINKEBY_ID:
      return '0x16baf0de678e52367adc69fd067e5edd1d33e3bf'
    case MAIN_ID:
      return '0x06012c8cf97bead5deae237070f9587f8e7a266d'
    default:
  }
})(NETWORK)

module.exports = { CRYPTO_KITTIES_CONTRACT_ADDRESS }
