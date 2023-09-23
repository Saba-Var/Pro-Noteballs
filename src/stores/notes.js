import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  const noteAddHandler = (newNote) => {
    notes.value.unshift({
      createdAt: new Date().toDateString(),
      id: new Date().getTime(),
      content: newNote.trim(),
      updatedAt: null
    })
  }

  const deleteNoteHandler = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  const editNoteHandler = (id, newContent) => {
    let note = notes.value.find((note) => note.id === id)

    if (note) {
      note.updatedAt = new Date().toDateString()
      note.content = newContent
    }
  }

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

  return {
    totalCharactersCount,
    deleteNoteHandler,
    totalNotesCount,
    editNoteHandler,
    getNoteContent,
    noteAddHandler,
    notes
  }
})
