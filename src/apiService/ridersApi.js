import axios from 'axios'

export default {
  async getOnlineRiders () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/associates/online')
    return res.data
  },
  async getOfflineRiders () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/associates/offline')
    return res.data
  },
  async getInacitveRiders () {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/associates/inactive')
    return res.data
  },
  async getRider (orderId) {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/associates/' + orderId)
    return res.data
  },
  async getTasks (driverNo) {
    const res = await axios.get('https://dispatchpanel.volantltd.com/server/associatesTasks/' + driverNo)
    return res.data
  }
}
