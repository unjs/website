<template>
  <div>
    <SiteHeader
    title="Discover"
    description="Universal JavaScript Solutions"
    github="un-contrib"
    />
    <div>
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData() {
    const { projects } = await $fetch('/api/project/all')

    return {
      projects
    }
  }
}
</script>
