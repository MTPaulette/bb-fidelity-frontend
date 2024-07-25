import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

//initial state
const state = {
  user: null,
  users: null,
}

const getters = {
  isLogged: state => !!state.user
}

const mutations = {
  setUserData (state, userData) {
    state.user = userData.user
    console.log("-------------------store----------------------------")
    console.log(state.user)
    
    localStorage.setItem('user', JSON.stringify(userData.user))
    localStorage.setItem('token', userData.token)
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
  },

  setAllUsersData (state, AlluserData) {
    state.users = AlluserData
    localStorage.setItem('users', JSON.stringify(AlluserData))
  },

  clearUserData () {
    localStorage.removeItem('user')
    location.reload()
  }
}

const actions = {
  async login ({ commit }, credentials) {
    return await axios
      .post('/login', credentials)
      .then(({ data }) => {
        commit('setUserData', data)
      })
  },

  async register ({ commit }, credentials) {
    /*
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-origin": "*",
        'Accept': 'application/json'
      }
    };
    return await axios
      .post('/register', credentials, {
        headers: axiosConfig
      })
      .then(({ data }) => {
        commit('setUserData', data)
      })
    */

    return await axios
      .post('/register', credentials)
      .then(({ data }) => {
        commit('setUserData', data)
      })
  },
  
  async profile ({ commit }, credentials) {
    return await axios
      .put('/profile', credentials)
      .then(({ data }) => {

        //update user in local storage
        commit('setUserData', data)
        return data
      })
  },

  async password ({ commit }, credentials) {
    return await axios
      .put('/password', credentials)
      .then(({ data }) => {
          commit('setUserData', data)
          return data
      })
  },

  async logout ({ commit }) {
    return await axios
      .delete('/logout')
      .then(({ data }) => {
        commit('clearUserData')
      })
  },

  async getAllUsers ({ commit }) {
    return await axios
      .get('/users')
      .then(({ data }) => {
        commit('setAllUsersData', data)
      })
  },

  async getUserById ({ commit }, credentials) {
    return await axios
      .get('/user/'+credentials.id)
      // .then(({ data }) => {
      //   commit('setAllUsersData', data)
      // })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}