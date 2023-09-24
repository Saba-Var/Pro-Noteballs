<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item is-size-4 is-family-monospace is-clickable">
          Pro Noteballs
        </RouterLink>

        <a
          @click.prevent="showMobileNavBar = !showMobileNavBar"
          :class="{ 'is-active': showMobileNavBar }"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
          class="navbar-burger"
          aria-expanded="false"
          aria-label="menu"
          role="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        :class="{ 'is-active': showMobileNavBar }"
        id="navbarBasicExample"
        ref="navbarMobileRef"
        class="navbar-menu"
      >
        <div class="navbar-end">
          <RouterLink
            @click="showMobileNavBar = !showMobileNavBar"
            active-class="is-active"
            class="navbar-item"
            to="/"
          >
            Notes
          </RouterLink>

          <RouterLink
            @click="showMobileNavBar = !showMobileNavBar"
            active-class="is-active"
            class="navbar-item"
            to="/stats"
          >
            Stats</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const showMobileNavBar = ref(false)
const navbarMobileRef = ref(null)
const navbarBurgerRef = ref(null)

onClickOutside(navbarMobileRef, () => showMobileNavBar.value && (showMobileNavBar.value = false), {
  ignore: [navbarBurgerRef]
})
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
