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

    <div class="card mb-4" v-for="note in notes" :key="note.id">
      <div class="card-content">
        <div class="content">
          {{ note.content }}
        </div>
        <p>
          Created at:
          <time :datetime="note.createdAt"> {{ note.createdAt }} </time>
        </p>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
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
