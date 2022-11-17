<template>
  <div class="card">
    <h2>
      <NuxtLink :to="`/p/${project.name}`">{{ project.name }}</NuxtLink>
    </h2>
    {{ project.description }}
  </div>
</template>

<script>
export default {
  props: {
    project: {
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
  margin: 1em;
  display: inline-block;
}
</style>
