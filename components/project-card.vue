<template>
    <NuxtLink :to="`/${repo.name}`" class="card">
        <h2>
            <span>{{ repo.name }}</span>
        </h2>
        <small class="repo-star"><Star /><span>stars {{ formatStarCount(repo.stars) }}</span></small>
        <p>{{ repo.description || '...' }}</p>
    </NuxtLink>
</template>

<script>
export default {
  props: {
    repo: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 8px;
  background-color: hsl(var(--white)/.8);
  color: hsl(var(--black));
  border: 1px dashed hsl(var(--black));
  transition: background .15s ease-in-out, color .15s ease-in-out;
  &:hover {
    color: hsl(var(--yellow));
    background-color: hsl(var(--black));
  }
  h2 {
    display: flex;
    flex-direction: column;
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
  .repo-star {
        position: absolute;
        display: flex;
        right: 20px;
        top: 20px;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        font-weight: 900;
        padding: 4px;
        z-index: -1;
        svg {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
