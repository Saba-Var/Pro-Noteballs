<template>
  <div>
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

        <div class="note-details">
          <div>
            <div class="has-text-grey-light">
              <small>
                Created at:
                <time :datetime="note.createdAt">
                  {{ createdAt.value }}
                </time>
              </small>
            </div>

            <div v-if="note.updatedAt" class="has-text-grey-light">
              <small>
                Updated at:
                <time :datetime="note.updatedAt"> {{ updatedAt.value }} </time>
              </small>
            </div>
          </div>

          <div class="has-text-grey-light">
            <small> {{ noteContentLengthText }}</small>
          </div>
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
          @click="modals.showDeleteModal = true"
          :disabled="isDeleting"
        >
          Delete
        </button>
      </footer>
    </div>

    <Teleport to="body">
      <ModalDeleteNote v-model="modals.showDeleteModal" @deleteNote="deleteNote" />
    </Teleport>
  </div>
</template>

<script setup>
import { ModalDeleteNote } from '@/components'
import { computed, ref, reactive } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useNotesStore } from '@/stores'
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

const storeNotes = useNotesStore()
const { deleteNoteHandler } = storeNotes

const isDeleting = ref(false)
const modals = reactive({
  showDeleteModal: false
})

const deleteNote = () => {
  modals.showDeleteModal = false
  isDeleting.value = true

  const timeout = setTimeout(() => {
    deleteNoteHandler(props.note.id)
  }, 500)

  return () => clearTimeout(timeout)
}

const noteContentLengthText = computed(() => {
  const length = props.note.content.length
  return `${length} ${length === 1 ? 'character' : 'characters'}`
})

const formatDate = (date) => useDateFormat(date, 'YYYY-MM-DD - HH:mm:ss')

const createdAt = computed(() => formatDate(props.note.createdAt))
const updatedAt = computed(() => formatDate(props.note.updatedAt))
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

.note-details {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
