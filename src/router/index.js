import { createRouter, createWebHistory } from 'vue-router'
import { ViewNotes, ViewStats, ViewEditNote } from '@/views'

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
  },

  {
    component: ViewEditNote,
    path: '/edit-note/:id',
    name: 'edit-note'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
