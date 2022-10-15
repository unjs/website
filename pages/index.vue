<template>
  <div>
    <SiteHeader
      title="Discover"
      description="Universal JavaScript Solutions"
      github="unjs"
    />
    <ProjectCard
      v-for="project in data.projects"
      :key="project.name"
      :project="project"
    />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/projects")
</script>
