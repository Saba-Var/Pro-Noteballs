<template>
  <AddEditNote
    placeholder="Edit note"
    v-model="noteContent"
    ref="addEditNoteRef"
    label="Edit Note"
    bgColor="link"
  >
    <template v-slot:buttons>
      <button @click="$router.push('/')" class="button is-light is-link mr-3">Cancel</button>

      <button
        class="button has-background-link is-link"
        :disabled="!noteContent.trim()"
        @click="editNote"
      >
        Save note
      </button>
    </template>
  </AddEditNote>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { AddEditNote } from '@/components'
import { onMounted, ref } from 'vue'

const noteStore = useNotesStore()
const noteContent = ref('')
const router = useRouter()
const route = useRoute()

const { getNoteContent, editNoteHandler } = noteStore

const editNote = () => {
  editNoteHandler(+route.params.id, noteContent.value)
  router.push('/')
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
