import { useToast } from 'vue-toastification'
import { firebaseAuth } from '@/services'
import { useNotesStore } from '@/stores'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const userData = reactive({})

  const { notesStoreInit, clearNotesHandler } = useNotesStore()
  const router = useRouter()
  const toast = useToast()

  const authDetectHandler = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        userData.id = user.uid
        userData.email = user.email
        router.push('/')
        notesStoreInit()
      } else {
        userData.id = null
        userData.email = null
        router.push('/auth')
      }
    })
  }

  const registerUserHandler = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      toast.success('User registered successfully')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use')
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  const signInHandler = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      router.push('/')
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        toast.error('Wrong password')
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  const logoutHandler = async () => {
    try {
      await signOut(firebaseAuth)
      router.push('/auth')
      clearNotesHandler()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return { registerUserHandler, logoutHandler, signInHandler, authDetectHandler, userData }
})
