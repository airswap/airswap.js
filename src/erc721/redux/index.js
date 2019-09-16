import defaultMiddleware from './middleware'
import contractFunctionMiddleware from './contractFunctionMiddleware'

import reducers, { selectors as reducerSelectors } from './reducers'
import * as eventTrackingSelectors from './eventTrackingSelectors'
import * as derivedSelectors from './selectors'

const selectors = {
  ...derivedSelectors,
  ...eventTrackingSelectors,
  ...reducerSelectors,
}

const middleware = [defaultMiddleware, contractFunctionMiddleware]

export { middleware, reducers, selectors }
