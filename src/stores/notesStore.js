import { useToast } from 'vue-toastification'
import { firebaseDb } from '@/services'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  orderBy,
  addDoc,
  query,
  doc
} from 'firebase/firestore'

export const useNotesStore = defineStore('notes', () => {
  const notesCollection = collection(firebaseDb, 'notes')
  const toast = useToast()

  const notesLoading = ref(false)
  const notes = ref([])

  const getNoteContent = computed(() => {
    return (id) => {
      const note = notes.value?.find((note) => note.id === id)
      return note ? note.content : null
    }
  })

  const totalNotesCount = computed(() => notes.value.length)

  const totalCharactersCount = computed(() => {
    return notes.value.reduce((acc, note) => acc + note.content.length, 0)
  })

  const getAllNotes = async () => {
    try {
      notesLoading.value = true

      const q = query(notesCollection, orderBy('createdAt', 'desc'))
      onSnapshot(q, (querySnapshot) => {
        const allNotes = []

        querySnapshot.forEach((doc) => {
          allNotes.push({
            id: doc.id,
            ...doc.data()
          })
        })

        notes.value = allNotes
        notesLoading.value = false
      })
    } catch (error) {
      toast.error('Notes could not be fetched!')
    }
  }

  const noteAddHandler = async (newNote, cb = () => {}) => {
    try {
      await addDoc(notesCollection, {
        createdAt: new Date().toISOString(),
        content: newNote.trim(),
        updatedAt: null
      })

      toast.success('Note added successfully!')
      cb()
    } catch (error) {
      toast.error('Note could not be added!')
    }
  }

  const editNoteHandler = async (id, newContent) => {
    try {
      await updateDoc(doc(notesCollection, id), {
        content: newContent,
        updatedAt: new Date().toISOString()
      })

      toast.success('Note updated successfully!')
    } catch (error) {
      console.log(error)
      toast.error('Note could not be updated!')
    }
  }

  const deleteNoteHandler = async (id) => {
    try {
      await deleteDoc(doc(notesCollection, id))
      toast.success('Note deleted successfully!')
    } catch (error) {
      toast.error('Note could not be deleted!')
    }
  }

  return {
    totalCharactersCount,
    deleteNoteHandler,
    totalNotesCount,
    editNoteHandler,
    getNoteContent,
    noteAddHandler,
    notesLoading,
    getAllNotes,
    notes
  }
})
