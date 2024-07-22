import { createApp } from 'vue'
import Vuex from 'vuex'
import App from '../App.vue'
import axios from 'axios'

const app = createApp(App)

app.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  modules: {
    auth,
    service,
    users,
    purchases
  },
  state: {
    user: null,
    users: null,
    services: null,
    serviceId: null,
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
      state.services = AllServiceData
      localStorage.setItem('services', JSON.stringify(AllServiceData))
    },

    setServiceIdData (state, ServiceIdData) {
      state.serviceId = ServiceIdData
      localStorage.setItem('serviceId', JSON.stringify(ServiceIdData))
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


    updateBalance ({ commit }, credentials) {
      return axios
        .put('/updateBalance', credentials)
    },

    getUserById ({ commit }, credentials) {
      return axios
        .get('/user/'+credentials.id)
        // .then(({ data }) => {
        //   commit('setAllUsersData', data)
        // })
    },

    getServiceByIdCorrect ({ commit }, credentials) {
          console.log('==========================================================')
          console.log(credentials)
      return axios
        .get('/service/'+credentials)
        .then((res) => {
          commit('setServiceIdData', res.data.service)
        })
    },

    

    getServiceById ({ commit }, credentials) {
      return axios
        .get('/service/'+credentials.id)
    },



    createService ({ commit }, credentials) {
      return axios
        .post('/service/store/', credentials)
    },

    updateService ({ commit, dispatch }, credentials) {
      return axios
        .put('/service/'+credentials.id+'/update', credentials.service)
        .then((data) => {

          //after udpate services in local store
          dispatch('getAllServices')
          return data
        })
    },
  },

  getters : {
    isLogged: state => !!state.user
  }
})

