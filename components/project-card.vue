<template>
  <div class="card">
    <h2>
      <NuxtLink :to="`/${repo.name}`">{{ repo.name }}</NuxtLink>
    </h2>
    <p class="description">
      {{ repo.description || '...' }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    repo: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px dashed #323330;
  border-radius: 5px;
  padding: 0.5em;
  margin: .5em;
  display: inline-block;
  max-width: 33vw;
}

.description {
  color: #323330;
  font-size: 0.8em;
  text-overflow: ellipsis;
}
</style>
