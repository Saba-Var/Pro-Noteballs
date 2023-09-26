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

        <Form @submit="submitHandler" :validation-schema="authFormValidationSchema">
          <div class="field">
            <label class="label"><span class="has-text-danger">*</span>Email</label>
            <div class="control">
              <Field
                placeholder="Enter your email address"
                class="input"
                name="email"
                type="email"
              />
            </div>
            <ErrorMessage class="has-text-danger" name="email" />
          </div>

          <div class="field">
            <label class="label"><span class="has-text-danger">*</span>Password</label>
            <div class="control">
              <Field placeholder="Enter a password" name="password" type="password" class="input" />
            </div>
            <ErrorMessage class="has-text-danger" name="password" />
          </div>

          <button type="submit" class="button mt-5 submit-btn is-primary">{{ formTitle }}</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage, configure } from 'vee-validate'
import { authFormValidationSchema } from '@/schemas'
import { ref, computed } from 'vue'

const register = ref(false)

const formTitle = computed(() => (register.value ? 'Register' : 'Login'))

const submitHandler = (data) => {
  console.log(data)
}

configure({
  validateOnInput: true
})
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}

.submit-btn {
  width: 100%;
}
</style>
