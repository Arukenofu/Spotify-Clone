import './app/global.scss';

import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from '@/app/App.vue';
import {router} from '@/app/router';

import ClickOutside from '@/app/directives/ClickOutside';
import DisableChild from '@/app/directives/DisableChild';

import {VueQueryPlugin, VueQueryPluginConfig} from '@/app/lib/VueQuery';
import {VueTippy, VueTippyConfig} from "@/app/lib/VueTippy";
import i18n from "@/app/lib/i18n";

const app = createApp(App);

// official plugins
app.use(createPinia());
app.use(router);

// community plugins
app.use(VueQueryPlugin, VueQueryPluginConfig);
app.use(VueTippy, VueTippyConfig);
app.use(i18n);

// directives
app.directive('click-outside', ClickOutside);
app.directive('disable-child', DisableChild);

app.mount('#app');