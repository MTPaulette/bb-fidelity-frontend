import axios from 'axios'
import router from '../../router'

//inittial state
const state = {
  services: null,
}

const getters = {
}

const mutations = {
  setAllServicesData (state, AllServiceData) {
    state.services = AllServiceData
    localStorage.setItem('services', JSON.stringify(AllServiceData.services))
  },

  clearServicesData () {
    localStorage.removeItem('services')
  }
}

const actions = {
  async getAllServices ({ commit }) {
    commit('clearServicesData')
    return await axios
      .get('/services')
      .then(({ data }) => {
        commit('setAllServicesData', data)
      })
      .catch(err => {
        if(err.response.status === 403) {
          router.push({ name: 'forbidden' })
        }
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

  async createService ({ dispatch }, credentials) {
    return await axios
      .post('/service/store/', credentials)
      .then((data) => {

        //after udpate services in local store
        dispatch('getAllServices')
        return data
      })
    },

  updateService ({ dispatch }, credentials) {
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