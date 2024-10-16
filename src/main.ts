import './app/global.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import { router } from './app/router';

import ClickOutside from '@/app/directives/ClickOutside';
import DisableChild from '@/app/directives/DisableChild';
import { Tooltip } from '@/app/directives/Tooltip';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.directive('click-outside', ClickOutside);
app.directive('disable-child', DisableChild);
app.directive('tooltip', Tooltip);

app.mount('#app');
