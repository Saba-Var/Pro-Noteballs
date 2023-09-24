<template>
  <div
    :class="{
      'scale-out-center': isCanceling
    }"
  >
    <AddEditNote
      placeholder="Edit note"
      v-model="noteContent"
      ref="addEditNoteRef"
      label="Edit Note"
      bgColor="link"
      :class="{
        'scale-out-center': isCanceling
      }"
    >
      <template v-slot:buttons>
        <button @click="cancelHandler" class="button is-light is-link mr-3">Cancel</button>

        <button
          class="button has-background-link is-link"
          :disabled="!noteContent.trim()"
          @click="editNote"
        >
          Save note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/store'
import { useToast } from 'vue-toastification'
import { AddEditNote } from '@/components'
import { onMounted, ref } from 'vue'

const noteStore = useNotesStore()
const isCanceling = ref(false)
const noteContent = ref('')
const router = useRouter()
const route = useRoute()
const toast = useToast()

const { getNoteContent, editNoteHandler } = noteStore

const editNote = () => {
  editNoteHandler(+route.params.id, noteContent.value)
  toast.success('Note edited successfully!')
  router.push('/')
}

const cancelHandler = () => {
  isCanceling.value = true

  const timeout = setTimeout(() => {
    router.push('/')
  }, 500)

  return () => clearTimeout(timeout)
}

onMounted(() => {
  const note = getNoteContent(+route.params.id)
  if (note) {
    noteContent.value = note
  } else {
    router.push('/')
  }
})
</script>
