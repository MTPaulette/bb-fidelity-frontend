import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

//inittial state
const state = {
  purchases: null,
}

const getters = {
}

const mutations = {
  setAllPurchasesData (state, AllPurchaseData) {
    state.purchases = AllPurchaseData
    localStorage.setItem('purchases', JSON.stringify(AllPurchaseData.purchases))
  }
}

const actions = {
  async getAllPurchases ({ commit }) {
    return await axios
      .get('/purchases')
      .then(({ data }) => {
        commit('setAllPurchasesData', data)
      })
  },

  async getPurchaseById ({ commit }, credentials) {
    return await axios
      .get('/purchase/'+credentials.id)
  },

  async createPurchase ({ dispatch }, credentials) {
    return await axios
      .post('/purchase/store/', credentials)
      .then((data) => {
        //after udpate services in local store
        dispatch('getAllPurchases')
        return data
      })
  },

  async getAllServicesOfUser ({ commit }, credentials) {
    return await axios
      .get('/user/'+credentials.id+'/services')
  },

  async getAllUsersOfService ({ commit }, credentials) {
    return await axios
      .get('/service/'+credentials.id+'/users')
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}