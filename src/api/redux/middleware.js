export default function apiMiddleware() {
  return next => action => {
    switch (action.type) {
      default:
    }

    next(action)
  }
}
