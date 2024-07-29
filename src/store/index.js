import Vuex from 'vuex'

//modules
import auth from './modules/auth.js'
import services from './modules/services.js'
import purchases from './modules/purchases.js'

export default new Vuex.Store({
  modules: {
    auth,
    services,
    purchases
  },
})

