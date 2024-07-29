import router from '../../router/index-historic'
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
  async getAllPurchases ({ commit }) {
    return await axios
      .get('/purchases')
      .then(({ data }) => {
        commit('setAllPurchasesData', data)
        return data
      })
      .catch(err => {
        if(err.response.status == 403) {
          router.push({ name: 'forbidden' })
        }
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
        return data
      })
      .catch(err => {
        if(err.response.status == 403) {
          router.push({ name: 'forbidden' })
        }
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