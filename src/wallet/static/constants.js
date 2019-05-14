import _ from 'lodash'
import walletTypesJSON from './walletTypes.json'

const walletTypes = walletTypesJSON.map(wallet => wallet.type)
const walletByType = _.keyBy(walletTypesJSON, 'type')
const web3WalletTypes = walletTypes.filter(walletType => !!walletByType[walletType].web3)

export { walletTypes, walletByType, web3WalletTypes }
