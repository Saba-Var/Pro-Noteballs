<template>
  <div class="card p-4 mb-5 scale-in-center" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          @input="value = $event.target.value"
          :placeholder="placeholder"
          :value="modelValue"
          class="textarea"
          maxlength="400"
          v-autofocus
        />
      </div>
    </div>

    <div class="textarea-footer">
      <div
        class="is-grouped-left has-text-white"
        :class="[value.length > 400 ? 'has-text-danger' : 'has-text-white']"
      >
        {{ characterCountPreview }}
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vAutofocus } from '@/directives'
import { computed } from 'vue'

const props = defineProps({
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
  },
  maxLength: {
    type: Number,
    default: 400
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const characterCountPreview = computed(() => {
  return `${value.value.length}/${props.maxLength}`
})
</script>

<style scoped>
.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
