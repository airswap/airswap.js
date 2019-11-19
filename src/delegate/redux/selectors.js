import _ from 'lodash'
import { createSelector } from 'reselect'
import { getDelegateRules } from './callDataSelectors'
import { getDisplayPriceFromContractPrice } from '../utils'
import { getTokensSymbolsByAddress } from '../../tokens/redux/reducers'

const getFormattedDelegateRules = createSelector(
  getDelegateRules,
  getTokensSymbolsByAddress,
  (rules, tokensSymbolsByAddress) => {
    if (_.isEmpty(tokensSymbolsByAddress)) {
      return []
    }
    return rules.map(
      ({
        parameters: { contractAddress: delegateAddress, senderToken, signerToken },
        response: { maxSenderAmount, priceCoef, priceExp },
      }) => ({
        delegateAddress,
        ...getDisplayPriceFromContractPrice({ senderToken, signerToken, maxSenderAmount, priceCoef, priceExp }),
        senderSymbol: tokensSymbolsByAddress[senderToken],
        signerSymbol: tokensSymbolsByAddress[signerToken],
      }),
    )
  },
)

export { getFormattedDelegateRules }
