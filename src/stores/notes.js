import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  const noteAddHandler = (newNote) => {
    notes.value.push({
      id: Math.random() + new Date().getTime(),
      createdAt: new Date().toDateString(),
      content: newNote
    })
  }

  const deleteNoteHandler = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return { notes, noteAddHandler, deleteNoteHandler }
})
