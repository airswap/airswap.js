import _ from 'lodash'
import * as tokens from '../tokens/redux'
import * as wallet from '../wallet/redux'
import * as deltaBalances from '../deltaBalances/redux'
import * as reserves from '../reserves/redux'
import * as events from '../events/redux'
import * as api from '../api/redux'
import * as erc20 from '../erc20/redux'
import * as keySpace from '../keySpace/redux'
import * as dexIndex from '../dexIndex/redux'
import * as protocolMessaging from '../protocolMessaging/redux'
import * as airswapExchange from '../airswapExchange/redux'
import * as gas from '../gas/redux'
import * as fiat from '../fiat/redux'
import * as hdw from '../HDW/redux'
import * as ledger from '../ledger/redux'

import { connectActionContainer } from '../utils/redux'

const state = {
  tokens,
  wallet,
  deltaBalances,
  reserves,
  events,
  api,
  erc20,
  keySpace,
  dexIndex,
  protocolMessaging,
  airswapExchange,
  gas,
  fiat,
  hdw,
  ledger,
}

const middleware = _.map(_.values(state), 'middleware')
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
