import { collection, onSnapshot, addDoc, orderBy, query } from 'firebase/firestore'
import { useToast } from 'vue-toastification'
import { firebaseDb } from '@/services'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notesCollection = collection(firebaseDb, 'notes')
  const toast = useToast()

  const notes = ref([])

  const getNoteContent = computed(() => {
    return (id) => {
      const note = notes.value.find((note) => note.id === id)
      return note ? note.content : null
    }
  })

  const totalNotesCount = computed(() => notes.value.length)

  const totalCharactersCount = computed(() => {
    return notes.value.reduce((acc, note) => acc + note.content.length, 0)
  })

  const getAllNotes = async () => {
    try {
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

  const editNoteHandler = (id, newContent) => {
    let note = notes.value.find((note) => note.id === id)

    if (note) {
      note.updatedAt = new Date().toDateString()
      note.content = newContent
    }
  }

  const deleteNoteHandler = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return {
    totalCharactersCount,
    deleteNoteHandler,
    totalNotesCount,
    editNoteHandler,
    getNoteContent,
    noteAddHandler,
    getAllNotes,
    notes
  }
})
