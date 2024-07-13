import { createRouter, createWebHistory } from 'vue-router'
import {routes, handleHotUpdate} from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  // if (to.path !== '/auth' && !localStorage.getItem('token')) {
  //   return '/auth'
  // }
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
