import ridersApi from '../../apiService/ridersApi.js'

export async function getOfflineRiders (state, val) {
  const res = await ridersApi.getOfflineRiders()
  return res
}

export async function getOnlineRiders (state, val) {
  const res = await ridersApi.getOnlineRiders()
  return res
}

export async function getInactiveRiders (state, val) {
  const res = await ridersApi.getInacitveRiders()
  return res
}

export async function getTasks (state, val) {
  const res = await ridersApi.getTasks(val)
  return res
}
