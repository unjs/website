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
    <NuxtLink :href="`https://github.com/${repo.repo.repo}`" class="project-gh" target="_blank">Check out<strong>{{ repo.repo.name }}</strong> on Github
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
  margin-bottom: 24px;
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
  & > *:first-child {
    margin-top: 0;
  }

  h1,
  h2 {
    font-weight: 900;
    margin: 16px 0;
    padding-bottom: 4px;
    border-bottom: 1px dashed hsl(var(--black) / 0.1);
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 8px 0;
  }

  blockquote {
    border-left: 4px solid hsl(var(--black) / 0.8);
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
  ul,
  ol {
    margin-inline-start: 24px;
    line-height: 1.2;
    a {
      &:hover {
        text-decoration: underline;
      }   
    }
  }

  table {
    display: block;
    width: 100%;
    width: max-content;
    max-width: 100%;
    overflow: auto;
    border-collapse: collapse;
    tr {
      border-color: hsl(var(--black) / 0.1);
      border-top: 1px solid hsl(var(--black) / 0.1);
    }
    th, td {
      border: 1px solid hsl(var(--black) / 0.1);
      padding: 8px 16px;
      font-weight: 600;
    }
  }

  a {
    text-decoration: underline hsl(var(--black)) 2px;
  }

  code {
    padding: 2px 4px;
    border-radius: 4px;
    margin: 0;
    font-size: 14px;
    color: hsl(var(--yellow));
    background-color: hsl(var(--black)/.9);
  }
}
</style>
