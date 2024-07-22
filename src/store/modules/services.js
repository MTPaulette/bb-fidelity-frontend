import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

//inittial state
const state = {
  services: null,
}

const getters = {
}

const mutations = {
  setAllServicesData (state, AllServiceData) {
    state.services = AllServiceData
    localStorage.setItem('services', JSON.stringify(AllServiceData))
  }
}

const actions = {
  async getAllServices ({ commit }) {
    return await axios
      .get('/services')
      .then(({ data }) => {
        commit('setAllServicesData', data)
      })
  },


  updateBalance ({ commit }, credentials) {
    return axios
      .put('/updateBalance', credentials)
  },

  async getServiceById ({ commit }, credentials) {
    return await axios
      .get('/service/'+credentials.id)
  },

  async createService ({ commit }, credentials) {
    return await axios
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}