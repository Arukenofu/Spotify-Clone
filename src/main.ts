import './app/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/App.vue'
import {router} from './app/router'
import ToolTip from "./app/directives/Tooltip";

const app = createApp(App)

app.directive('tooltip', ToolTip);
app.use(createPinia())
app.use(router)

app.mount('#app')
