
import { createApp } from 'vue'
import Vuex from 'vuex'
import App from '../App.vue'
import axios from 'axios'

const app = createApp(App)

app.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    user: null,
    users: null,
    services: null,
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    setAllUsersData (state, AlluserData) {
      state.users = AlluserData
      localStorage.setItem('users', JSON.stringify(AlluserData))
    },
    

    setAllServicesData (state, AllServiceData) {
      state.users = AllServiceData
      localStorage.setItem('services', JSON.stringify(AllServiceData))
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
          return data
        })
    },


    register ({ commit }, credentials) {
      /*
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-origin": "*",
          'Accept': 'application/json'
        }
      };
      return axios
        .post('/register', credentials, {
          headers: axiosConfig
        })
        .then(({ data }) => {
          commit('setUserData', data)
        })
      */

      return axios
        .post('/register', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },
    
    profile ({ commit }, credentials) {
      return axios
        .put('/profile', credentials)
        //.then(({ data }) => {
          //this.state.user = data.user
          //localStorage.setItem('user', JSON.stringify(data))
          //console.log(data)
          //console.log(this.state.user)
          //location.reload()

        //})
    },

    password ({ commit }, credentials) {
      return axios
        .put('/password', credentials)
    },

    logout ({ commit }) {
          console.log("bbbbbbbbbbbbbbbbbbbbbbb")
      commit('clearUserData')
    },

    getAllUsers ({ commit }) {
      return axios
        .get('/users')
        .then(({ data }) => {
          commit('setAllUsersData', data)
        })
    },

    getAllServices ({ commit }) {
      return axios
        .get('/services')
        .then(({ data }) => {
          commit('setAllServicesData', data)
        })
    },


    updatePoint ({ commit }, credentials) {
      return axios
        .put('/updatePoint', credentials)
    },

    showProfile ({ commit }, credentials) {
      console.log("bbbbbbbbbbbbbbbbbbbbbbb")
      console.log(credentials.id)
      return axios
        .get('/user/'+credentials.id)
        .then(({ data }) => {
          commit('setAllUsersData', data)
        })
    },
  },

  getters : {
    isLogged: state => !!state.user
  }
})