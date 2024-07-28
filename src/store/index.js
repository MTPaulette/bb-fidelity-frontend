import { createApp } from 'vue'
import Vuex from 'vuex'
import App from '../App.vue'
import axios from 'axios'

//modules
import auth from './modules/auth.js'
import services from './modules/services.js'
import purchases from './modules/purchases.js'

const app = createApp(App)

//app.use(Vuex)

// axios.defaults.baseURL = 'https://fidelityapi.brain-booster.net'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

const axiosConfig = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-origin": "*",
  'Accept': 'application/json',
  'Access-Control-Allow-Credentials': true,
  'Authorization': 'Bearer '+localStorage.getItem('token')
};

//axios.defaults.credentials = 'include'
axios.defaults.withCredentials = true
axios.defaults.headers = axiosConfig

export default new Vuex.Store({
  modules: {
    auth,
    services,
    purchases
  },
})

