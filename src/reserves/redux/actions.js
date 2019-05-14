export const findReserves = address => ({
  type: 'FIND_RESERVES',
  address,
})

export const createReserve = () => ({
  type: 'CREATE_RESERVE',
})

export const createReserveLimitOrder = (order, reserveAddress) => ({
  type: 'CREATE_RESERVE_LIMIT_ORDER',
  order,
  reserveAddress,
})

export const cancelReserveLimitOrder = (order, reserveAddress) => ({
  type: 'CANCEL_RESERVE_LIMIT_ORDER',
  order,
  reserveAddress,
})
