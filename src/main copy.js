import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import axios from './store/axios' // Chemin vers le fichier axios configuré

import './assets/main.css'

//progress during page change
import '../node_modules/nprogress/nprogress.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.config.globalProperties.$axios = axios;
 
app.mount('#app')