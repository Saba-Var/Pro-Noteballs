<template>
  <div
    :class="{
      'scale-out-center': isEditingNote
    }"
    class="notes"
  >
    <AddEditNote v-model="newNoteValue" ref="addEditNoteRef">
      <template v-slot:buttons>
        <button
          :disabled="!newNoteValue.trim()"
          class="button has-background-success is-link"
          @click="newNoteAddHandler"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <NoteCard
      @enableEditingNote="enableEditingNote"
      v-model="isEditingNote"
      v-for="note in notes"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup>
import { NoteCard, AddEditNote } from '@/components'
import { useNotesStore } from '@/stores/notes'
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const addEditNoteRef = ref(null)
const isEditingNote = ref(false)
const newNoteValue = ref('')
const toast = useToast()

const storeNotes = useNotesStore()

const { notes } = storeToRefs(storeNotes)

const { noteAddHandler } = storeNotes

const newNoteAddHandler = () => {
  noteAddHandler(newNoteValue.value)
  newNoteValue.value = ''
  addEditNoteRef.value.focusTextarea()
  toast.success('Note added successfully!')
}

const enableEditingNote = () => {
  isEditingNote.value = true
}

onMounted(() => {
  addEditNoteRef.value.focusTextarea()
})
</script>
