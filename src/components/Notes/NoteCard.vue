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
        class="card-footer-item action-button button is-clickable has-text-link"
        @click="enableEditingNote"
        :disabled="isDeleting"
      >
        Edit
      </button>

      <button
        class="card-footer-item action-button button is-clickable has-text-danger"
        :disabled="isDeleting"
        @click="deleteNote"
      >
        Delete
      </button>
    </footer>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits({
  'update:modelValue': null
})

const enableEditingNote = () => {
  emit('update:modelValue', true)

  const timeout = setTimeout(() => {
    router.push(`/edit-note/${props.note.id}`)
  }, 500)

  return () => clearTimeout(timeout)
}

const toast = useToast()
const storeNotes = useNotesStore()
const { deleteNoteHandler } = storeNotes

const isDeleting = ref(false)

const deleteNote = () => {
  isDeleting.value = true

  const timeout = setTimeout(() => {
    deleteNoteHandler(props.note.id)
    toast.success('Note deleted successfully!')
  }, 500)

  return () => clearTimeout(timeout)
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
