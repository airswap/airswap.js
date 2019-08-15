function getEventId({ transactionHash, logIndex }) {
  return `${transactionHash}-${logIndex}`
}

module.exports = { getEventId }
