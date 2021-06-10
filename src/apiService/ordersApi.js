import axios from 'axios'

export default {
  async getOrdersApi () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/unassigned')
    return res.data
  },
  async getIntransitOrder () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/intransit')
    return res.data
  },
  async getOrder (orderId) {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/' + orderId)
    return res.data
  },
  async fetchOrder (orderId) {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/fetchOrder/' + orderId)
    return res.data
  },
  async getDispatchedOrder (orderId) {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/fetchDispatchedOrder/' + orderId)
    return res.data
  },
  async getUnscheduledMoves () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/unscheduledMoves')
    return res.data
  },
  async getScheduledMoves () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/scheduledMoves')
    return res.data
  },
  async updateScheduleMove (val) {
    const res = await axios.post('https://dispatchpanel.volantltd.com/server/updateScheduleMove', { orderNo: val.orderNo, date: val.date, time: val.time, registrationToken: val.registrationToken })
    return res.data
  },
  async initiateAutoAssign (origin, truckType) {
    const res = await axios.post('https://dispatchpanel.volantltd.com/server/autoAssign', { origin: origin, truckType: truckType })
    return res.data
  },
  async getCompleteOrders () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/orders/getCompleteOrders')
    return res.data
  }
}
