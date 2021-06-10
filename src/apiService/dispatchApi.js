import axios from 'axios'

export default {
  async dispatchOrder (data) {
    const res = await axios.post('https://dispatchpanel.volantltd.com/server/dispatchRoute', { data: data })
    return res
  }
}
