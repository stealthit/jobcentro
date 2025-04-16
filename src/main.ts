import { createApp } from 'vue'
import App from './App'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as echarts from 'echarts'
import 'echarts/theme/macarons'
import 'echarts/theme/dark-bold'
import './assets/styles/default.scss'
import trim from './utils/trim'
import i18n from "@/locales";

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.config.globalProperties.echarts = echarts
app.config.globalProperties.trim = trim

app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
