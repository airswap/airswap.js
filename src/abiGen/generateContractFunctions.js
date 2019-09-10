/* eslint-disable global-require */
/* eslint-disable no-shadow */
const _ = require('lodash')
const { getContractFunctionName, getInterface } = require('./utils')

function getInputNames(inputs) {
  return _.map(inputs, ({ name, type }, i) => name || `${type}Input${i + 1}`)
}

function buildContractFunctionParams(inputs, type, payable, contractKey) {
  const inputNames = getInputNames(inputs)
  let parameters = inputNames
  if (type === 'transaction') {
    parameters.push('signer')
  }
  if (payable) {
    parameters = ['ethAmount', ...parameters]
  }

  if (!contractKey) {
    parameters = ['contractAddress', ...parameters]
  }

  return parameters
}

function generateContractFunctions(abiLocation, contractKey, eventNamespace = '') {
  const abi = require(`../${abiLocation}`)
  const contractFunctions = _.uniq(_.values(getInterface(abi).functions))
  const functionArray = contractFunctions.map(({ inputs, payable, type, name }) => {
    const parameters = buildContractFunctionParams(inputs, type, payable, contractKey)
    const functionArgs = parameters.length ? `${parameters.join(', ')}` : ''
    const getContract = type === 'transaction' ? 'signer' : 'constants.httpProvider'
    const lastParamContractAddress = contractKey ? '' : ', contractAddress'
    const functionName = getContractFunctionName(type, name, eventNamespace)
    const inputNames = getInputNames(inputs)
    const innerParamEthAmount = !payable
      ? ''
      : `${inputNames.length ? ', ' : ''}{ value: ethers.utils.bigNumberify(ethAmount || '0') }`
    return `function ${functionName}(${functionArgs}) {
  const contract = get${_.upperFirst(eventNamespace)}Contract(${getContract}${lastParamContractAddress})
  return contract.${name}(${inputNames.join(', ')}${innerParamEthAmount})
}
`
  })
  const passedInContractAddress = contractKey ? '' : ', contractAddress'
  const contractConstantsImport = "\nconst constants = require('../constants')\n"
  const contractAddress = contractKey ? `constants.${contractKey}` : 'contractAddress'

  return `const ethers = require('ethers')
const abi = require('../${abiLocation}')${contractConstantsImport}
function get${_.upperFirst(eventNamespace)}Contract(provider${passedInContractAddress}) {
  return new ethers.Contract(${contractAddress}, abi, provider)
}
 ${functionArray.join('\n')}
 
 module.exports = { ${contractFunctions.map(
   ({ name, type }) => `${getContractFunctionName(type, name, eventNamespace)} `,
 )} }
`
}

module.exports = generateContractFunctions
