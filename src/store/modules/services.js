import router from '../../router/index-historic'
import axios from './../axios'

//inittial state
const state = {
  services: null,
}

const getters = {
}

const mutations = {
  setAllServicesData (state, AllServiceData) {
    state.services = AllServiceData
  },
}

const actions = {
  async getAllServices ({ commit }) {
    return await axios
      .get('/services')
      .then(({ data }) => {
        commit('setAllServicesData', data)
        return data
      })
      .catch(err => {
        if(err.response.status == 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },

  async getServiceById ({ commit }, credentials) {
    return await axios
      .get('/service/'+credentials.id)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        if(err.response.status == 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },

  async getRecentServiceId() {
    return await axios
      .get('/recent/service')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        if(err.response.status == 403) {
          router.push({ name: 'forbidden' })
        }
      })
  },

  async createService ({ dispatch }, credentials) {
    return await axios
      .post('/service/store/', credentials)
      .then((data) => {
        return data
      })
    },

  async updateService ({ dispatch }, credentials) {
    return await axios
      .put('/service/'+credentials.id+'/update', credentials.service)
      .then((data) => {
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