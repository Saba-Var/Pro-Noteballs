import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { firebaseAuth } from '@/services'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const router = useRouter()

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

  const logoutHandler = async () => {
    try {
      await signOut(firebaseAuth)
      router.push('/auth')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return { registerUserHandler, logoutHandler }
})
