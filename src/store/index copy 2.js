import Vuex from 'vuex'
import axios from 'axios'

//modules
import auth from './modules/auth.js'
import services from './modules/services.js'
import purchases from './modules/purchases.js'


axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
axios.defaults.withCredentials = true

const axiosConfig = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*",
  'Accept': 'application/json',
  'Access-Control-Allow-Credentials': true,
  // 'Authorization': 'Bearer '+localStorage.getItem('token')
};

//axios.defaults.credentials = 'include'
//axios.defaults.headers = axiosConfig

export default new Vuex.Store({
  modules: {
    auth,
    services,
    purchases
  },
})
