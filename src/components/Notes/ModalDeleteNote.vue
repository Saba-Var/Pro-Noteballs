<template>
  <div
    class="modal p-2"
    :class="{
      'is-active': modelValue
    }"
  >
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">Do you really want to delete this note?</section>
      <footer class="modal-card-foot field is-grouped is-grouped-right">
        <button class="button is-danger" @click="$emit('deleteNote')">Delete</button>
        <button @click="closeModalHandler" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  modelValue: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['deleteNote', 'update:modelValue'])

const deleteModalRef = ref(null)

const closeModalHandler = () => {
  emit('update:modelValue', false)
}

onClickOutside(deleteModalRef, closeModalHandler)
</script>
