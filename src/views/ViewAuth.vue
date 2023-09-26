<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{
            'is-active': !register
          }"
        >
          <a @click.prevent="register = false">Login</a>
        </li>

        <li
          :class="{
            'is-active': register
          }"
        >
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <p class="title has-text-centered">{{ formTitle }}</p>
        <div class="content">
          Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi
          porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const register = ref(false)

const formTitle = computed(() => (register.value ? 'Register' : 'Login'))
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
