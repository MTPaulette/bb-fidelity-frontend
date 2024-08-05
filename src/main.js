import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import './assets/main.css'

//progress during page change
import '../node_modules/nprogress/nprogress.css' 

const app = createApp(App)
//app.config.globalProperties.$axiosConfig = { ...axiosConfig }
app.use(store)
app.use(router)
 
app.mount('#app')