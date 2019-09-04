import * as ethers from 'ethers'

// localStorage is used to cache blocks, and if they are too big it causes data to be dropped, depending on your browser
// as a workaround we only include the data we need
function trimBlockForLocalStorage({ number, timestamp, transactions }) {
  return { number, timestamp, transactions: transactions.map(({ to, from, value }) => ({ to, from, value })) }
}

export const gotBlock = block => ({
  type: 'GOT_BLOCK',
  block: trimBlockForLocalStorage({
    ...block,
    timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
    number: ethers.utils.bigNumberify(block.number).toNumber(),
  }),
})

export const gotLatestBlock = block => ({
  type: 'GOT_LATEST_BLOCK',
  block: trimBlockForLocalStorage({
    ...block,
    timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
    number: ethers.utils.bigNumberify(block.number).toNumber(),
  }),
})

export const gotBlocks = blocks => ({
  type: 'GOT_BLOCKS',
  blocks: blocks.map(block =>
    trimBlockForLocalStorage({
      ...block,
      timestamp: ethers.utils.bigNumberify(block.timestamp).toNumber(),
      number: ethers.utils.bigNumberify(block.number).toNumber(),
    }),
  ),
})
