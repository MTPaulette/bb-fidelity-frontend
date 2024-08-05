import axios from './../axios'
import Cookies from 'js-cookie'


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
        console.log(err)
      })
  },

  async getPurchaseById ({ commit }, credentials) {
    return await axios
      .get('/purchase/'+credentials.id)
  },

  async createPurchase ({ dispatch }, credentials) {
    console.log('==================cookie token')
    console.log(Cookies.get('XSRF-TOKEN'))
    return await axios
      .post('/purchase/store/', credentials, {
        headers: {
          'X-XSRF-TOKEN' : Cookies.get('XSRF-TOKEN')
        }
      })
      .then((data) => {
        return data
      })
      .catch(err => {
        console.log(err)
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