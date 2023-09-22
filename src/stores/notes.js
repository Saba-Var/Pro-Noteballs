import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([
    {
      id: 1,
      createdAt: new Date().toDateString(),
      content: 'This is a note'
    }
  ])

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
