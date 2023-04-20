import { createApp } from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import router from './router'

import './assets/base.css'

const app = createApp(App)

app.use(router)
app.use(VueHead)
app.use(VueGtag, {
   config: { id: "G-9424K7XVZ8"}
})

app.mount('#app')
