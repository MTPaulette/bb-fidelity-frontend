import axios from './../axios'
import Cookies from 'js-cookie'

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
        console.log(err)
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
    
    await axios.get('/csrf-cookie')
        .then(() => {
          console.log('==================apres')
          console.log(Cookies.get('XSRF-TOKEN'))
          return axios
            .post('/service/store/', credentials)
            .then((data) => {
              return data
            })
    })
    
    await axios.get('/csrf-cookie')
        .then(() => {
          return axios
            .post('/service/store/', credentials, {
              headers: {
                'X-XSRF-TOKEN' : Cookies.get('XSRF-TOKEN')
              }
            })
            .then((data) => {
              return data
            })
    })
  },

  async createService ({ dispatch }, credentials) {

    
    console.log('==================service avant token')
    console.log(Cookies.get('XSRF-TOKEN'))

    return axios.post('/service/store/', credentials, {
      headers: {
        // 'Origin': 'https://fidelity.brain-booster.net',
        'Origin': 'http://127.0.0.1:3000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type,x-pingother',
        
        // 'Cookie': `X-XSRF-TOKEN=${Cookies.get('XSRF-TOKEN')}`,
        // 'X-Requested-With': 'XMLHttpRequest',
        //'X-XSRF-TOKEN' : Cookies.get('XSRF-TOKEN')
      },
      // withCredentials: true,
    })
            .then((data) => {
    
              console.log('==================service apres token')
              console.log(Cookies.get('XSRF-TOKEN'))
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