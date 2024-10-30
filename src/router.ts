import { useApplicationConfigStore } from '@/core/config/application-config.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes: [
    {
      path: '/',
      redirect: '/collect'
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('./credit-application/collect-user-data.view.vue')
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('./credit-application/confirm-application.view.vue')
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('./credit-application/application-summary.view.vue')
    }
  ]
})

router.beforeEach(async () =>
  !window.baseUrls ? await useApplicationConfigStore().loadApplicationConfig() : Promise.resolve()
)
export default router
