// @flow
import BlockTracker from 'eth-block-tracker'
import each from 'lodash/fp/each'
import flow from 'lodash/fp/flow'
import keys from 'lodash/fp/keys'
import reduce from 'lodash/fp/reduce'
import type { Store } from 'redux'
import type { Block, Transaction, Rules } from './types'

type ConfigOptions = {
  provider: *,
  syncingTimeout: number,
  rules: Rules,
  cache?: boolean,
}

class BlockCruncher {
  rules: Rules = []
  config: ConfigOptions
  store: Store

  constructor(config: ConfigOptions): void {
    this.config = config
    const { provider, syncingTimeout, rules } = config
    const blockTracker = new BlockTracker({
      provider,
      syncingTimeout,
    })

    this.rules = rules
    blockTracker.on('block', block => this.processNewBlock(block))
    blockTracker.start()
  }

  processNewBlock = (block: Block): void => {
    each(this.processTransactionForRules(this.rules))(block.transactions)
  }

  processTransactionForRules = (rules: Rules) => (txn: Transaction): void => {
    each(rule => {
      const r = typeof rule === 'function' ? rule() : rule
      const shouldApplyRule = flow(
        keys,
        reduce((valid, key) => {
          switch (typeof r.filter[key]) {
            case 'function':
              return valid && r.filter[key](txn[key])
            case 'string':
            case 'number':
            default:
              return valid && r.filter[key] === txn[key]
          }
        }, true),
      )(r.filter)
      if (shouldApplyRule) {
        r.fn(txn)
      }
    })(rules)
  }
}

export default BlockCruncher
