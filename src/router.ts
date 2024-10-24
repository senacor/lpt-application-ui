import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/form',
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/FormView.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('./views/ConfirmView.vue'),
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('./views/SuccessView.vue'),
    },
  ],
})

export default router
