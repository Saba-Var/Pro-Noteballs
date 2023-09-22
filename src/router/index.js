import { createRouter, createWebHistory } from 'vue-router'
import { ViewNotes, ViewStats } from '@/views'

const routes = [
  {
    component: ViewNotes,
    name: 'notes',
    path: '/'
  },

  {
    component: ViewStats,
    path: '/stats',
    name: 'stats'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
