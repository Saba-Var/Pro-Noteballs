<template>
  <div class="stats scale-in-center">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ totalNotesCount }}</td>
        </tr>

        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input v-autofocus type="text" class="input" placeholder="Do you love Pro Noteballs?" />
  </div>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { vAutofocus } from '@/directives'

const { totalNotesCount, totalCharactersCount } = useNotesStore()
</script>
