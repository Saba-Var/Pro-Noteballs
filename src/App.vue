<script setup>
import { useNotesStore, useAuthStore } from '@/stores'
import { RouterView } from 'vue-router'
import { NavBar } from '@/components'
import { onMounted } from 'vue'

const notesStore = useNotesStore()
const authStore = useAuthStore()

onMounted(notesStore.getAllNotes)
onMounted(authStore.authDetectHandler)
</script>

<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
