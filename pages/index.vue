<template>
  <div class="project-list">
    <ProjectCard v-for="repo in repos" :key="repo.id" :repo="repo" />
  </div>
</template>

<script setup lang="ts">
const { data: repos } = await useFetch<any>("/api/repos");
</script>

<style lang="scss" scoped>
.project-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media (min-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
