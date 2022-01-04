import _ from 'lodash'
import * as tokens from '../tokens/redux'
import * as wallet from '../wallet/redux'
import * as deltaBalances from '../deltaBalances/redux'
import * as events from '../events/redux'
import * as ens from '../ens/redux'
import * as erc20 from '../erc20/redux'
import * as erc721 from '../erc721/redux'
import * as erc1155 from '../erc1155/redux'
import * as swap from '../swap/redux'
import * as gas from '../gas/redux'
import * as blockTracker from '../blockTracker/redux'
import * as transactionTracker from '../transactionTracker/redux'
import * as wrapper from '../wrapper/redux'
import * as callData from '../callData/redux'
import * as abis from '../abis/redux'
import * as weth from '../weth/redux'
import * as securitize from '../dsProtocol/redux'
import * as complianceService from '../complianceService/redux'

import { connectActionContainer } from '../utils/redux'

const state = {
  tokens,
  wallet,
  deltaBalances,
  events,
  ens,
  erc20,
  erc721,
  swap,
  gas,
  blockTracker,
  transactionTracker,
  wrapper,
  callData,
  abis,
  weth,
  securitize,
  erc1155,
  complianceService,
}

const middleware = _.flatten(_.map(_.values(state), 'middleware'))
const rootReducerObj = _.mapValues(state, 'reducers')
const configureStateContainers = connect =>
  _.mapValues(_.merge({}, ..._.compact(_.map(_.values(state), 'containers'))), containerSelector =>
    containerSelector(connect),
  )

const configureActionContainers = connect =>
  _.mapValues(_.merge({}, ..._.compact(_.map(_.values(state), 'actions'))), (action, name) =>
    connectActionContainer(action, name)(connect),
  )

export { middleware, rootReducerObj, configureStateContainers, configureActionContainers }
