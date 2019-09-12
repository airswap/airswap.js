const _ = require('lodash')
const uuid = require('uuid4')
const EventSource = require('eventsource')
const fetch = require('isomorphic-fetch')
const { REACT_APP_SERVER_URL, AIRSWAP_API_URL, AIRSWAP_HEADLESS_API_SSE, MAKER_STATS_URL } = require('../constants')

const prefix = typeof window !== 'undefined' ? window.location.protocol : 'https:'

function fetchRouterConnectedUsers() {
  return new Promise((resolve, reject) => {
    fetch(`${prefix}${REACT_APP_SERVER_URL}users`, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function fetchIndexerIntents() {
  return new Promise((resolve, reject) => {
    fetch(`${AIRSWAP_API_URL}intents/expanded`, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json().then(intents =>
          intents.map(intent => {
            return { ...intent, makerAddress: intent.address, swapVersion: 1 }
          }),
        )
      })
      .then(resolve)
  })
}

function fetchConnectedIntents() {
  return Promise.all([fetchIndexerIntents(), fetchRouterConnectedUsers()]).then(([intents, connectedUsers]) =>
    _.filter(intents, ({ makerAddress }) => _.includes(connectedUsers, makerAddress)),
  )
}

function fetchQuotes() {
  return new Promise((resolve, reject) => {
    fetch(`${MAKER_STATS_URL}getQuotes`, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function fetchMaxQuotes() {
  return new Promise((resolve, reject) => {
    fetch(`${MAKER_STATS_URL}getMaxQuotes`, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resolve)
  })
}

function formatQueryArrayKeys(queryArray) {
  return _.uniqBy(
    queryArray.map(q =>
      _.omit(
        _.mapKeys(q, (value, key) => {
          switch (key) {
            case 'makerToken':
              return 'mt'
            case 'takerToken':
              return 'tt'
            case 'makerAmount':
              return 'ma'
            case 'takerAmount':
              return 'ta'
            default:
              return key
          }
        }),
        'makerAddress',
      ),
    ),
    value => `${value.mt}${value.tt}`,
  ).map(q => ({ ...q, id: uuid() }))
}

function fetchQuotesSSE(queryArray, onMessageCallback) {
  let msgCount = 0
  const formattedQueryArray = formatQueryArrayKeys(queryArray)
  const queryURL = encodeURI(`${AIRSWAP_HEADLESS_API_SSE}getQuotes?params=${JSON.stringify(formattedQueryArray)}`)
  const evtSource = new EventSource(queryURL)
  evtSource.onmessage = e => {
    onMessageCallback(e.data)
    msgCount++
    if (msgCount === queryArray.length) {
      evtSource.close()
    }
  }
}

module.exports = {
  fetchRouterConnectedUsers,
  fetchIndexerIntents,
  fetchQuotes,
  fetchMaxQuotes,
  fetchQuotesSSE,
  formatQueryArrayKeys,
  fetchConnectedIntents,
}
