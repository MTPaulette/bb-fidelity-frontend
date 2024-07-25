
import axios from 'axios'
import router from '../../router'

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
  },

  clearPurchasesData () {
    localStorage.removeItem('purchases')
  }
}

const actions = {
  async getAllPurchases ({ commit }) {
    commit('clearPurchasesData')
    return await axios
      .get('/purchases')
      .then(({ data }) => {
        commit('setAllPurchasesData', data)
      })
      .catch(err => {
        console.log('=============err')
        console.log(err)
        if(err.response.status === 403) {
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
        //after udpate services in local store
        dispatch('getAllPurchases')
        return data
      })
  },

  async getAllServicesOfUser ({ commit }, credentials) {
    let token = localStorage.getItem('token')
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