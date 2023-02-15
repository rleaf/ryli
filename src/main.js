import { createApp } from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import router from './router'

import './assets/base.css'

const app = createApp(App)

app.use(router)
app.use(VueHead)

app.mount('#app')
