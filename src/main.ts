// import './assets/main.css'
import './assets/main.scss'

import 'vue-skeletor/dist/vue-skeletor.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)



app.use(createPinia())


app.mount('#app')
