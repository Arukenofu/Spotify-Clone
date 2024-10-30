import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(() => {});

if (import.meta.hot) {
  // @ts-ignore
  handleHotUpdate(setupLayouts(routes));
}
