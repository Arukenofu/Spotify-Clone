import './global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {router} from './router'
import ToolTip from "@/directives/Tooltip";

const app = createApp(App)

app.directive('tooltip', ToolTip);
app.use(createPinia())
app.use(router)

app.mount('#app')
