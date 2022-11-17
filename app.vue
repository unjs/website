<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} - UnJS` : 'UnJS - Unified JavaScript Solutions',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand&display=swap' }
  ]
})
</script>

<template>
  <main>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </main>
</template>

<style>
body, #app {
  background: #F0DB4F;
  color: #323330;
  font-family: Quicksand;
}

a {
  color: #323330;
}

.container {
  max-width: 1024px;
}

#__layout {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

</style>
