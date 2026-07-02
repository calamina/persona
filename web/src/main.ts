import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './utils/router.ts'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router).use(VueQueryPlugin).mount('#app')
