<script setup></script>

<template>
  <div class="card mb-4" v-for="i in [1, 2, 3]" :key="i">
    <div class="card-content">
      <div class="content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima inventore quae consequuntur
        quos asperiores optio temporibus illo harum reiciendis obcaecati explicabo illum modi,
        doloribus repudiandae. Ipsum provident reprehenderit eius aliquam?
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>
