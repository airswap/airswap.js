import { createSelector } from 'reselect'
import _ from 'lodash'

const getCallData = state => state.callData

export const getERC721GetApprovedOverride = createSelector(getCallData, values => {
  const filteredValues = _.filter(
    values,
    v => (v.name === 'getApproved' || v.name === 'kittyIndexToApproved') && v.namespace === 'ERC721',
  )
  const sortedValues = _.sortBy(filteredValues, 'timestamp').reverse()
  return _.uniqBy(sortedValues, v => JSON.stringify(v.parameters))
})
