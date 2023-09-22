import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import '@/assets/main.css'

import App from '@/App.vue'
import router from '@/router'

const pinia = createPinia()
const app = createApp(App)

const toastOptions = {
  pauseOnHover: false,
  timeout: 3000,
  toastClassName: 'toast'
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
