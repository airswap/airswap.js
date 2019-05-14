// @flow
import md5 from 'md5'

export const generateSeededTransactionHash = (seed: string) => {
  const x = md5(seed)
  const y = md5(x)
  // returns a 64 character string, not counting the 0x
  return `0x${x}${y}`
}

export function* randomTransactionHashGenerator(seed = '') {
  let iteration = 0
  while (true) {
    yield generateSeededTransactionHash(`transaction-${seed}-${iteration++}`)
  }
}

export const generateSeededAddress = (seed: string) => {
  const x = generateSeededTransactionHash(seed)
  // returns a 40 character string, not counting the 0x
  return x.substring(0, 42)
}

export function* randomAddressGenerator(seed = '') {
  let iteration = 0
  while (true) {
    yield generateSeededAddress(`address-${seed}-${iteration++}`)
  }
}
