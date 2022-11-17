<template>
  <div>
    <SiteHeader
      title="UnJS"
      description="Unified JavaScript Tools"
      github="unjs"
    />
    <ProjectCard
      v-for="repo in repos"
      :key="repo.id"
      :repo="repo"
    />
  </div>
</template>

<script setup lang="ts">
const { data: repos } = await useFetch<any>('/api/repos')
</script>
