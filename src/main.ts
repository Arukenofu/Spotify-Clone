import './app/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/App.vue'
import {router} from './app/router'

import Tooltip from './app/directives/Tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('tooltip', Tooltip)

app.mount('#app')
