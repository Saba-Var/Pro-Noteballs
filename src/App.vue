<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink class="" to="/">Home</RouterLink> |
    <RouterLink to="/stats">Stats</RouterLink>
  </nav>

  <RouterView />
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
