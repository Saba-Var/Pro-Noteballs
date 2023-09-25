import { ViewNotes, ViewStats, ViewEditNote, NotFoundPage } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'

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
  },

  {
    component: NotFoundPage,
    path: '/:pathMatch(.*)*',
    name: 'not-found'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
