<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        <p class="note-content">
          {{ note.content }}
        </p>
      </div>
      <div class="has-text-right has-text-grey-light mt-2">
        <small> {{ noteContentLengthText }}</small>
      </div>

      <div class="has-text-right has-text-grey-light">
        <small>
          Created at:
          <time :datetime="note.createdAt"> {{ note.createdAt }} </time>
        </small>
      </div>

      <div v-if="note.updatedAt" class="has-text-right has-text-grey-light">
        <small>
          Updated at:
          <time :datetime="note.updatedAt"> {{ note.updatedAt }} </time>
        </small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink class="card-footer-item" :to="`/edit-note/${note.id}`">Edit</RouterLink>

      <a class="card-footer-item" @click="deleteNoteHandler(note.id)" href="#">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const storeNotes = useNotesStore()
const { deleteNoteHandler } = storeNotes

const noteContentLengthText = computed(() => {
  const length = props.note.content.length
  return `${length} ${length === 1 ? 'character' : 'characters'}`
})
</script>

<style>
.note-content {
  white-space: pre-line;
}
</style>
