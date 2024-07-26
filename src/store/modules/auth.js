import axios from 'axios'
import router from '../../router'

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
    
    localStorage.setItem('user', JSON.stringify(userData.user))
    if(userData.token) {
      localStorage.setItem('token', userData.token)
    }
    // axios.defaults.headers.Authorization = `Bearer ${userData.token}`
  },

  setAllUsersData (state, AlluserData) {
    state.users = AlluserData
  },

  clearUserData () {
    localStorage.removeItem('user')
    location.reload()
  },
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
        commit('clearUserData')
    // return await axios
    //   .delete('/logout')
    //   .then(({ data }) => {
    //   })
  },

  async getAllUsers ({ commit }) {
    return await axios
      .get('/users')
      .then(({ data }) => {
        commit('setAllUsersData', data)
        return data
      })
      .catch(err => {
        if(err.response.status === 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },

  async getUserById ({ commit }, credentials) {
    return await axios
      .get('/user/'+credentials.id)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        if(err.response.status === 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },

  async getRecentUserId() {
    return await axios
      .get('/recent/user')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        if(err.response.status === 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}