<template>
  <div>
    <SiteHeader
      :title="project.name"
      :description="project.description"
      :github="project.repository"
    />
    <div>
      <h2><NLink to="/">Discover other projects</NLink></h2>
      <div v-html="readme" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    // TODO: Catch 404
    const { readme, project } = await $fetch('/api/project/info/' + params.name)
    return {
      readme,
      project
    }
  }
};
</script>
