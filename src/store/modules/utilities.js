import axios from '../axios'

//initial state
const state = {}

const getters = {}

const mutations = {}

const actions = {
  async getActivityLog({ commit }, credentials) {
    return await axios
      .get('/activity-log', {
        params: credentials
      })
      .then(({ data }) => {
        return data
      })
  },
  async clearLogs({ commit }, credentials) {
    return await axios
      .put('/clear-logs', credentials)
      .then(({ data }) => {
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