<template>
  <div
    :class="{
      'scale-out-center': isEditingNote
    }"
    class="notes"
  >
    <AddEditNote v-model="newNoteValue">
      <template v-slot:buttons>
        <button
          class="button has-background-success is-link"
          :disabled="!newNoteValue.trim()"
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
import { useNotesStore } from '@/store'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isEditingNote = ref(false)
const newNoteValue = ref('')
const toast = useToast()

const storeNotes = useNotesStore()

const { notes } = storeToRefs(storeNotes)

const { noteAddHandler } = storeNotes

const newNoteAddHandler = () => {
  noteAddHandler(newNoteValue.value)
  newNoteValue.value = ''
  toast.success('Note added successfully!')
}

const enableEditingNote = () => {
  isEditingNote.value = true
}
</script>
