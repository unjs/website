<template>
  <div>
    <div class="project-input__wrapper">
      <search-logo class="project-input-logo" />
      <input class="project-input" type="text" placeholder="Search" v-model="searchVal" :disabled="(repos.length <= 0)">
    </div>
    <div class="project-list">
      <ProjectCard v-for="repo in filterSearch(repos)" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchVal = ref('')
const { data: repos } = await useFetch<any>("/api/repos");

const filterSearch = (repos: any) => {
  return repos.filter((repo: any) => repo.name.toLowerCase().includes(searchVal.value.toLowerCase()))
}
</script>

<style lang="scss" scoped>
.project-input__wrapper {
  position: relative;

  .project-input-logo {
    --size: 1.75rem;
    
    position: absolute;
    top: 44%;
    left: .75rem;
    transform: translateY(-55%);

    width: var(--size);
    height: var(--size);
  }

  .project-input {
    width: 100%;
    background-color: hsl(var(--white) / 0.8);
    color: hsl(var(--black));
    margin-bottom: .75rem;
    border: 1px dashed hsl(var(--black));
    
    padding: 1.25rem 1.25rem 1.25rem 2.75rem;
    font-size: 1.25rem;
    line-height: 1.2;

    &:focus {
      outline: none;
      border: 1px solid hsl(var(--black));
    }
  
    &:disabled {
      background-color: hsl(var(--black-muted));
      cursor: not-allowed;
  
      &::placeholder {
        color: hsl(var(--yellow));
      }
    }
  }
}

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
