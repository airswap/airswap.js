import greenlet from 'greenlet'

export const greenletFetchJSON = greenlet(
  url =>
    new Promise((resolve, reject) => {
      fetch(url, {
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
    }),
)
