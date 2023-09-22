<template>
  <AddEditNote
    placeholder="Edit note"
    v-model="noteContent"
    ref="addEditNoteRef"
    label="Edit Note"
    bgColor="link"
  >
    <template v-slot:buttons>
      <button @click="$router.push('/')" class="button is-light is-link">Cancel</button>

      <button :disabled="!noteContent.trim()" class="button has-background-link is-link">
        Save note
      </button>
    </template>
  </AddEditNote>
</template>

<script setup>
import { AddEditNote } from '@/components'
import { ref } from 'vue'

const noteContent = ref('')
</script>
