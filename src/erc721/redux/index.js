import contractFunctionMiddleware from './contractFunctionMiddleware'

import * as eventTrackingSelectors from './eventTrackingSelectors'
import * as derivedSelectors from './selectors'

const selectors = {
  ...derivedSelectors,
  ...eventTrackingSelectors,
}

const middleware = [contractFunctionMiddleware]

export { middleware, selectors }
