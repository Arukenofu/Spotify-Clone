import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(() => {});

if (import.meta.hot) {
  handleHotUpdate(setupLayouts(routes));
}
