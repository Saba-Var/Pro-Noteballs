import { useToast } from 'vue-toastification'
import { firebaseAuth } from '@/services'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { reactive } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const router = useRouter()
  const userData = reactive({})

  const authDetectHandler = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        userData.id = user.uid
        userData.email = user.email
        router.push('/')
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
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return { registerUserHandler, logoutHandler, signInHandler, authDetectHandler, userData }
})
