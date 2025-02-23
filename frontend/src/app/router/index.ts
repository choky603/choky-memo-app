import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('@/pages/TodoView.vue'),
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('@/pages/GridView.vue'),
    },
  ],
})

export default router
