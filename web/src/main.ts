import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './utils/router.ts'
import './assets/styles/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(VueQueryPlugin).mount('#app')
