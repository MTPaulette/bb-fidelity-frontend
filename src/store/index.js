import Vuex from 'vuex'

//modules
import auth from './modules/auth.js'
import services from './modules/services.js'
import purchases from './modules/purchases.js'
import utilities from './modules/utilities.js'

export default new Vuex.Store({
  modules: {
    auth,
    services,
    purchases,
    utilities,
  },
})

