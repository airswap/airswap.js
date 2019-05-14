// @flow
import type BigNumber from 'bignumber.js'

export type Block = {
  number: number,
  hash: string,
  parentHash: string,
  nonce: string,
  sha3Uncles: string,
  logsBloom: string,
  transactionsRoot: string,
  stateRoot: string,
  miner: string,
  difficulty: BigNumber,
  totalDifficulty: BigNumber,
  extraData: string,
  size: number,
  gasLimit: number,
  gasUsed: number,
  timestamp: number,
  transactions: Array<string | Transaction>,
  uncles: Array<string>,
}

export type Transaction = {
  hash: string,
  nonce: number,
  blockHash: string,
  blockNumber: number,
  transactionindex: number,
  from: string,
  to: string,
  value: BigNumber,
  gasPrice: BigNumber,
  gas: number,
  input: string,
}

export type Rule = {
  filter: {
    [key: string]: number | string | (string => boolean) | (number => boolean),
  },
  fn: Transaction => void,
}

export type Rules = Array<Rule | (() => Rule)>

export type ConfigOptions = {
  provider: *,
  syncingTimeout: number,
  rules: Array<Rule | (() => Rule)>,
  cache?: boolean,
}
