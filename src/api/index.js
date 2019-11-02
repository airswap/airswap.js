const _ = require('lodash')
const qs = require('querystring')
const uuid = require('uuid4')
const EventSource = require('eventsource')
const fetch = require('isomorphic-fetch')
const {
  REACT_APP_SERVER_URL,
  AIRSWAP_API_URL,
  AIRSWAP_HEADLESS_API_SSE,
  MAKER_STATS_URL,
  AIRSWAP_HEADLESS_API,
} = require('../constants')

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
        return response.json().then(intents => intents.map(intent => ({ ...intent, makerAddress: intent.address })))
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

function fetchHeadlessOrders({ makerToken, takerToken, makerAmount, takerAddress, timeoutSeconds }) {
  const queryObj = _.pickBy({ makerToken, takerToken, makerAmount, takerAddress, timeoutSeconds }, _.identity) // removes falsey values from object
  const queryURL = `${AIRSWAP_HEADLESS_API}getOrders?${qs.stringify(queryObj)}`
  return new Promise((resolve, reject) =>
    fetch(queryURL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resp => resolve(resp)),
  )
}

function fetchHeadlessQuotes({ makerToken, takerToken, makerAmount, timeoutSeconds }) {
  const queryObj = _.pickBy({ makerToken, takerToken, makerAmount, timeoutSeconds }, _.identity) // removes falsey values from object
  const queryURL = `${AIRSWAP_HEADLESS_API}getQuotes?${qs.stringify(queryObj)}`
  return new Promise((resolve, reject) =>
    fetch(queryURL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resp => resolve(resp)),
  )
}

function fetchHeadlessMaxQuotes({ makerToken, takerToken, timeoutSeconds }) {
  const queryObj = _.pickBy({ makerToken, takerToken, timeoutSeconds }, _.identity) // removes falsey values from object
  const queryURL = `${AIRSWAP_HEADLESS_API}getMaxQuotes?${qs.stringify(queryObj)}`
  return new Promise((resolve, reject) =>
    fetch(queryURL, {
      method: 'get',
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.json()
      })
      .then(resp => resolve(resp)),
  )
}

module.exports = {
  fetchRouterConnectedUsers,
  fetchIndexerIntents,
  fetchQuotes,
  fetchMaxQuotes,
  fetchQuotesSSE,
  formatQueryArrayKeys,
  fetchConnectedIntents,
  fetchHeadlessOrders,
  fetchHeadlessQuotes,
  fetchHeadlessMaxQuotes,
}
