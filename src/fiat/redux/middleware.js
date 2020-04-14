export default function fiatMiddleware() {
  return next => action => {
    switch (action.type) {
      default:
    }
    return next(action)
  }
}
