<template>
  <div
    class="card mb-4 scale-in-center"
    :class="{
      'scale-out-center': isDeleting
    }"
  >
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
      <button
        class="card-footer-item action-button button is-clickable"
        @click="$router.push(`/edit-note/${note.id}`)"
        :disabled="isDeleting"
      >
        Edit
      </button>

      <button
        class="card-footer-item action-button button is-clickable"
        :disabled="isDeleting"
        @click="deleteNote"
      >
        Delete
      </button>
    </footer>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useToast } from 'vue-toastification'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const toast = useToast()
const storeNotes = useNotesStore()
const { deleteNoteHandler } = storeNotes

const isDeleting = ref(false)

const deleteNote = () => {
  isDeleting.value = true

  setTimeout(() => {
    deleteNoteHandler(props.note.id)
    toast.success('Note deleted successfully!')
  }, 500)
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

.card-footer {
  border: none !important;
}

.action-button {
  border-radius: 0 !important;
}
</style>
