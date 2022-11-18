<script setup lang="ts">
// TODO: replace with ungh type definition
// Interface is supposed to be transpiled to `Object` type validator
// Ref: https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
interface RepoProp {
  name: string
  description: string
  stars: number
}

defineProps<{
  repo: RepoProp
}>()
</script>

<template>
  <NuxtLink :to="`/${repo.name}`" class="card">
    <h2>{{ repo.name }}</h2>
    <small class="repo-star">
      <Star />
      {{ formatStarCount(repo.stars) }}
    </small>
    <p>{{ repo.description || '...' }}</p>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card {
  --easing: 0.15s ease;

  position: relative;
  padding: 1.25rem;
  background-color: hsl(var(--white) / 0.8);
  color: hsl(var(--black));
  border: 1px dashed hsl(var(--black));
  transition: background var(--easing), color var(--easing);

  &:hover {
    color: hsl(var(--yellow));
    background-color: hsl(var(--black));

    p {
      color: hsl(var(--white));
    }
  }

  h2 {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  p {
    transition: color var(--easing);
    margin-top: 0.5rem;
    color: hsl(var(--black-muted));
  }

  .repo-star {
    position: absolute;
    display: flex;
    right: 20px;
    top: 20px;
    align-items: center;
    gap: 4px;
    font-size: 16px;
    padding: 4px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
