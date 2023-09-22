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
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" @click="deleteNoteHandler" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['deleteNoteHandler'])

const deleteNoteHandler = () => {
  emit('deleteNoteHandler', props.note.id)
}

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
