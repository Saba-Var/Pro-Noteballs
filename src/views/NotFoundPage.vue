<template>
  <div class="not-found-container">
    <h1>404 Page not found</h1>
    <h2>it seems you're in the wrong page</h2>
  </div>
</template>

<style scoped>
.not-found-container {
  position: fixed;
  width: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-size: 2rem;
  font-weight: 900;
  color: #a12a21;
  text-align: center;
}

h2 {
  text-align: center;
  color: gray;
  font-size: 1rem;
}
</style>
