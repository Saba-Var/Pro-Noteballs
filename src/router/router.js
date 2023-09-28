import { ViewNotes, ViewStats, ViewEditNote, NotFoundPage, ViewAuth } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/services'

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

router.beforeEach(async (to, _, next) => {
  try {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        resolve(user)
      })
    })

    let redirect = null

    if (!user && to.name !== 'auth') {
      redirect = { name: 'auth' }
    }

    if (user && to.name === 'auth') {
      redirect = { name: 'notes' }
    }

    next(redirect)
  } catch (error) {
    console.error('Error checking authentication state:', error)
    next()
  }
})

export default router
