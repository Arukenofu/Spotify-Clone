import {Router} from 'vue-router';

declare global {
  interface Window {
    tempTitle: string;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
  }
}

export {};
