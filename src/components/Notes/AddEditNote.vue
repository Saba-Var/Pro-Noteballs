<template>
  <div class="card p-4 mb-5 scale-in-center" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          @input="$emit('update:modelValue', $event.target.value)"
          :placeholder="placeholder"
          :value="modelValue"
          class="textarea"
          v-autofocus
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    default: 'success',
    type: String
  },
  placeholder: {
    default: 'Add a new note',
    type: String
  },
  label: {
    type: String
  }
})

const vAutofocus = {
  mounted: (el) => el.focus()
}
</script>
