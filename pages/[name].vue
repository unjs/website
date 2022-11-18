<script setup lang="ts">
import "~/assets/github-light.css";

const route = useRoute();
const { data: repo } = await useFetch<any>(
  `https://ungh.pi0.workers.dev/repos/unjs/${route.params.name}`
);
const { data: readme } = await useFetch<any>(
  `https://ungh.pi0.workers.dev/repos/unjs/${route.params.name}/readme`
);

// useHead({
//   title: repo.value.name,
//   meta: [
//     { name: 'description', content: repo.value.description }
//   ]
// })
</script>

<template>
  <div class="project-detail">
    <NuxtLink :href="`https://github.com/${repo.repo.repo}`" class="project-gh"
      >Check out<strong>{{ repo.repo.name }}</strong> on Github
      <GithubLogo /> &mdash; <Star />stars
      {{ formatStarCount(repo.repo.stars) }}
    </NuxtLink>
    <div class="readme" v-html="readme.html" />
  </div>
</template>

<style lang="scss" scoped>
.project-detail {
  position: relative;
  padding: 20px 40px;
  background-color: hsl(var(--white) / 0.8);
}

.project-gh {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  width: fit-content;
  padding: 8px;
  color: hsl(var(--yellow));
  background-color: hsl(var(--black));
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>

<style lang="scss">
.readme {
  h1,
  h2 {
    font-weight: 900;
    margin: 16px 0;
  }
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 8px 0;
  }
  blockquote {
    border-left: 4px solid hsl(var(--black));
    padding-left: 8px;
    margin: 0 0 16px;
  }
  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: 16px;
  }
}
</style>
