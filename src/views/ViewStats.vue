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
  </div>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'

const { totalNotesCount, totalCharactersCount } = useNotesStore()
</script>
