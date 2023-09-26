import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { firebaseAuth } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()

  const isRegistering = ref(false)

  const registerUserHandler = async ({ email, password }) => {
    console.log(isRegistering.value)
    isRegistering.value = true
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

  return { registerUserHandler, isRegistering }
})
