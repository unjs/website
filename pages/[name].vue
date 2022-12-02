<script setup lang="ts">
import "~/assets/github-light.css";

const route = useRoute();
const { data: repo } = await useFetch<any>(
  `https://ungh.cc/repos/unjs/${route.params.name}`
);
const { data: readme } = await useFetch<any>(
  `https://ungh.cc/repos/unjs/${route.params.name}/readme`
);

useHead({
  title: repo.value.repo.name,
  meta: [
    { name: 'description', content: repo.value.repo.description }
  ]
})
</script>

<template>
  <div class="project-detail">
    <NuxtLink :href="`https://github.com/${repo.repo.repo}`" class="project-gh" target="_blank"><span>Check out</span><strong>{{ repo.repo.name }}</strong> on Github
      <GithubLogo /> &mdash; <Star />stars
      {{ formatStarCount(repo.repo.stars) }}
    </NuxtLink>
    <div class="readme" v-html="readme.html" />
  </div>
</template>

<style lang="scss" scoped>
.project-detail {
  position: relative;
  padding: 1rem;
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

  @media screen and (max-width:767px) {
    width: 100%;
    justify-content: center;
    span {
      display: none;
    }
  }
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

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 1.65rem;
      line-height: 1.25;
    }
    h2 {
      font-size: 1.35rem;
      line-height: 1.25;
      margin-top: 2rem;
    }
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

  .highlight {
    overflow: auto;
    background: rgba(0,0,0,.05);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  code {
    padding: 2px 4px;
    border-radius: 4px;
    margin: 0;
    font-size: 14px;
    color: hsl(var(--yellow));
    background-color: hsl(var(--black)/.9);

    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
}
</style>
