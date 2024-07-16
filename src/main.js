import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import './assets/main.css'
// plugin install
// one ways two base url set in axios
// import axios from './axios/axios_plugin'
// import store from './store/index1.js'

// window.baseurl = 'http://127.0.0.1:8000/api'

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

const app = createApp(App)
// app.config.globalProperties.axios = { ...axiosInstance }

// const token = localStorage.getItem('user').token;
// if(token) {
//     axios.defaults.headers.common.Authorization = token
//     // axios.defaults.headers.common.Authorization = `Bearer ${token}`
// }

    
// const app = createApp(App)
   /* 
  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
*/
app.use(store)
app.use(router)
 
 
app.mount('#app')
