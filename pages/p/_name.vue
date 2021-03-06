<template>
  <div>
    <SiteHeader
      :title="project.name"
      :description="project.description"
      :github="project.repository"
    />
    <div class="content">
      <h2><NLink to="/">Discover other projects</NLink></h2>
      <div class="readme" v-html="readme" />
    </div>
  </div>
</template>

<style scoped>
  .content {
    max-width: 1024px;
  }
  .readme {
    background: rgba(255, 255, 255, .8);
    padding: 1em;
    border-radius: 3px;
  }
</style>

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
