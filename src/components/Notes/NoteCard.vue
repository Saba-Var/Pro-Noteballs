<template>
  <div class="card mb-4">
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
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>
