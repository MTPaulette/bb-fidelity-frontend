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
  async getAllServices ({ commit }, credentials) {
    return await axios
      .get('/services', {
        params: credentials
      })
      .then(({ data }) => {
        commit('setAllServicesData', data)
        return data
      })
  },

  async getServiceById ({ commit }, credentials) {
    return await axios
      .get('/service/'+credentials.id)
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  },

  async getRecentServiceId() {
    return await axios
      .get('/recent/service')
      .then(({ data }) => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  },

  async createService ({ dispatch }, credentials) {
    return axios.post('/service/store', credentials)
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

  async deleteService ({ dispatch }, credentials) {
    return await axios
      .put('/service/'+credentials.id+'/delete', credentials)
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