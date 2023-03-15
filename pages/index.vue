<script setup lang="ts">
const search = ref('')
const { data } = await useFetch<any>("/api/repos");
const repos = useFuseSearch({
  search,
  data,
  options: {
    useExtendedSearch: true,
    keys: [
      'name',
      'description',
      'repo'
    ]
  }
})

useHead({
  title: '',
  meta: [
    { name: 'description', content: 'Discover the list of UnJS tools.' }
  ]
})
</script>

<template>
  <div>
    <SearchInput
      v-model:search="search"
      placeholder="Search for repo..."
    />
    <div class="project-list">
      <ProjectCard v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>

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
