import { ViewNotes, ViewStats, ViewEditNote, NotFoundPage, ViewAuth } from '@/views'
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
    component: ViewAuth,
    path: '/auth',
    name: 'auth'
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

router.beforeEach(async (to) => {
  const userId = localStorage.getItem('userId')

  if (!userId && to.name !== 'auth') {
    return { name: 'auth' }
  }

  if (userId && to.name === 'auth') {
    return { name: 'notes' }
  }
})

export default router
