import middleware from './middleware'
import reducers, { selectors as reducerSelectors } from './reducers'
import * as eventTrackingSelectors from './eventTrackingSelectors'
import * as derivedSelectors from './selectors'

const selectors = {
  ...derivedSelectors,
  ...eventTrackingSelectors,
  ...reducerSelectors,
}

export { middleware, reducers, selectors }
