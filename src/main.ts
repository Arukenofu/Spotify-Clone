import './app/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@unhead/vue";

import App from './app/App.vue'
import {router} from './app/router'

import Tooltip from './app/directives/Tooltip'
import ClickOutside from "./app/directives/ClickOutside";

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);
app.use(head);

app.directive('tooltip', Tooltip);
app.directive('click-outside', ClickOutside);

app.mount('#app');
