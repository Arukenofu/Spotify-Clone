import './app/global.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import { router } from './app/router';

import ClickOutside from '@/app/directives/ClickOutside';
import DisableChild from '@/app/directives/DisableChild';
import FloatingVue from "@/app/lib/FloatingVue";

import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, {
    enableDevtoolsV6Plugin: true
});
app.use(FloatingVue);

app.directive('click-outside', ClickOutside);
app.directive('disable-child', DisableChild);

app.mount('#app');
