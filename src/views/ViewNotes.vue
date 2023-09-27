<template>
  <div
    :class="{
      'scale-out-center': isEditingNote
    }"
    class="notes"
  >
    <AddEditNote bgColor="info" v-model="newNoteValue">
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

    <progress v-if="notesLoading" class="progress is-large is-info" max="100" />
    <template v-else>
      <NoteCard
        @enableEditingNote="enableEditingNote"
        v-model="isEditingNote"
        v-for="note in notes"
        :key="note.id"
        :note="note"
      />

      <div class="is-size-5 has-text-centered has-text-grey-light pt-6" v-if="!notes?.length">
        You have no notes yet. Let's add some!
      </div>
    </template>
  </div>
</template>

<script setup>
import { NoteCard, AddEditNote } from '@/components'
import { useNotesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isEditingNote = ref(false)
const newNoteValue = ref('')

const storeNotes = useNotesStore()

const { notes, notesLoading } = storeToRefs(storeNotes)

const { noteAddHandler } = storeNotes

const newNoteAddHandler = () => {
  noteAddHandler(newNoteValue.value, () => {
    newNoteValue.value = ''
  })
}

const enableEditingNote = () => {
  isEditingNote.value = true
}
</script>
