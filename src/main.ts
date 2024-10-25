import './assets/main.css'

import { createApp } from 'vue'

import App from './app.vue'
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
