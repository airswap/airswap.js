import defaultMiddleware from './middleware'
import contractFunctionMiddleware from './contractFunctionMiddleware'
import reducers, { selectors } from './reducers'

const middleware = [defaultMiddleware, contractFunctionMiddleware]

export { middleware, reducers, selectors }
