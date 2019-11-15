import middleware from './middleware'
import reducers from './reducers'
import * as eventTrackingSelectors from './eventTrackingSelectors'

const selectors = {
  ...eventTrackingSelectors,
}

export { middleware, reducers, selectors }
