import { createApp } from 'vue'
import Vuex from 'vuex'
import App from '../App.vue'

//modules
import auth from './modules/auth.js'
import services from './modules/services.js'
import purchases from './modules/purchases.js'

const app = createApp(App)

app.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    services,
    purchases
  },
})

