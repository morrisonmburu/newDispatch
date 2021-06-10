import axios from 'axios'

export default {
  async login (email, password) {
    const res = await axios.post('https://dispatchpanel.volantltd.com/server/login', { email: email, password: password })
    return res.data
  }
}
