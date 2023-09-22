<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea v-model="newNoteValue" class="textarea" placeholder="Add a new note" />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            :disabled="!newNoteValue.trim()"
            class="button has-background-success is-link"
            @click="newNoteAddHandler"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <NoteCard v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { NoteCard } from '@/components'
import { ref } from 'vue'

const newNoteValue = ref('')

const notes = ref([])

const newNoteAddHandler = () => {
  notes.value.push({
    id: Math.random() + new Date().getTime(),
    createdAt: new Date().toDateString(),
    content: newNoteValue.value
  })
  newNoteValue.value = ''
}
</script>
