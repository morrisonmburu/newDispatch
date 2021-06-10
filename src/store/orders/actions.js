import ordersApi from '../../apiService/ordersApi.js'
import dispatchApi from '../../apiService/dispatchApi.js'

export async function getOrders (state, val) {
  const res = await ordersApi.getOrdersApi()
  return res
}

export async function getIntransitOrders (state, val) {
  const res = await ordersApi.getIntransitOrder()
  return res
}

export async function dispatch (state, val) {
  const res = await dispatchApi.dispatchOrder(val)
  return res
}

export async function getUnscheduledMoves (state, val) {
  const res = await ordersApi.getUnscheduledMoves()
  return res
}

export async function getScheduledMoves (state, val) {
  const res = await ordersApi.getScheduledMoves()
  return res
}

export async function updateScheduleMove (state, val) {
  const res = await ordersApi.updateScheduleMove(val)
  return res
}

export async function getCompleteOrders (state, val) {
  const res = await ordersApi.getCompleteOrders()
  return res
}

// export async function fetchOrder (state, val) {
//   const res = await ordersApi.fetchOrder(val)
//   return res
// }

// export async function getOrder (state, val) {
//   const res = await ordersApi.getOrder(val)
//   state.commit('orderMutation', res)
// }
