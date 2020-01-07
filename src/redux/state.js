import _ from 'lodash'
import * as tokens from '../tokens/redux'
import * as wallet from '../wallet/redux'
import * as deltaBalances from '../deltaBalances/redux'
import * as events from '../events/redux'
import * as api from '../api/redux'
import * as ens from '../ens/redux'
import * as erc20 from '../erc20/redux'
import * as erc721 from '../erc721/redux'
import * as keySpace from '../keySpace/redux'
import * as dexIndex from '../dexIndex/redux'
import * as protocolMessaging from '../protocolMessaging/redux'
import * as swap from '../swap/redux'
import * as swapLegacy from '../swapLegacy/redux'
import * as gas from '../gas/redux'
import * as fiat from '../fiat/redux'
import * as hdw from '../HDW/redux'
import * as ledger from '../ledger/redux'
import * as blockTracker from '../blockTracker/redux'
import * as transactionTracker from '../transactionTracker/redux'
import * as wrapper from '../wrapper/redux'
import * as callData from '../callData/redux'
import * as abis from '../abis/redux'
import * as indexer from '../indexer/redux'
import * as index from '../index/redux'
import * as delegateFactory from '../delegateFactory/redux'
import * as delegate from '../delegate/redux'
import * as weth from '../weth/redux'

import { connectActionContainer } from '../utils/redux'

const state = {
  tokens,
  wallet,
  deltaBalances,
  events,
  api,
  ens,
  erc20,
  erc721,
  keySpace,
  dexIndex,
  protocolMessaging,
  swap,
  swapLegacy,
  gas,
  fiat,
  hdw,
  ledger,
  blockTracker,
  transactionTracker,
  wrapper,
  callData,
  abis,
  indexer,
  index,
  delegateFactory,
  delegate,
  weth,
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
