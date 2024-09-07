import axios from './../axios'

//inittial state
const state = {
  purchases: null,
}

const getters = {
}

const mutations = {
  setAllPurchasesData (state, AllPurchaseData) {
    state.purchases = AllPurchaseData
  }
}

const actions = {
  async getAllPurchases ({ commit }, credentials) {
    return await axios
      .get('/purchases', {
        params: credentials
       })
      .then(({ data }) => {
        commit('setAllPurchasesData', data)
        return data
      })
  },

  async getPurchaseById ({ commit }, credentials) {
    return await axios
      .get('/purchase/'+credentials.id)
  },

  async createPurchase ({ dispatch }, credentials) {
    return axios
      .post('/purchase/store', credentials)
  },

  async getAllServicesOfUser ({ commit }, credentials) {
    return await axios
      .get('/user/'+credentials.id+'/services', {
        params: credentials.selectedFilters
      })
      .then(({ data }) => {
        return data
      })//?page='+credentials.page)
  },

  async getAllUsersOfService ({ commit }, credentials) {
    return await axios
      .get('/service/'+credentials.id+'/users', {
        params: credentials.selectedFilters
      })
      .then(({ data }) => {
        return data
      })//?page='+credentials.page)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}