<script setup></script>

<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Add a new note" />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button has-background-success is-link">Add New Note</button>
        </div>
      </div>
    </div>

    <div class="card mb-4" v-for="i in [1, 2, 3]" :key="i">
      <div class="card-content">
        <div class="content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima inventore quae
          consequuntur quos asperiores optio temporibus illo harum reiciendis obcaecati explicabo
          illum modi, doloribus repudiandae. Ipsum provident reprehenderit eius aliquam?
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>
