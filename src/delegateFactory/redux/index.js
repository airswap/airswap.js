import defaultMiddleware from './middleware'
import contractFunctionMiddleware from './contractFunctionMiddleware'
import reducers from './reducers'
import * as eventTrackingSelectors from './eventTrackingSelectors'

const selectors = {
  ...eventTrackingSelectors,
}

const middleware = [defaultMiddleware, contractFunctionMiddleware]

export { middleware, reducers, selectors }
