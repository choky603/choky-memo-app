import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { vuetify } from '@/app/plugins/vuetify'

import '@mdi/font/css/materialdesignicons.css' // Material Design Icons
import '@/app/assets/main.css'

import App from '@/App.vue'
import router from '@/app/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
