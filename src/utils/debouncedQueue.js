const _ = require('lodash')

class DebouncedQueue {
  constructor(processQueue, delay = 250) {
    this.queue = []
    this.processQueue = processQueue
    this.debouncedProcessAndEmptyQueue = _.debounce(this.processAndEmptyQueue.bind(this), delay, {
      leading: true,
      trailing: true,
    })
  }
  push(item) {
    if (_.isArray(item)) {
      this.queue = [...item, ...this.queue]
    } else {
      this.queue = [item, ...this.queue]
    }
    this.debouncedProcessAndEmptyQueue()
  }
  processAndEmptyQueue() {
    this.processQueue(this.queue)
    this.queue = []
  }
}

module.exports = DebouncedQueue
