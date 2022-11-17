<template>
  <div class="header">
    <NuxtLink to="/">
      <img class="logo" src="~/assets/logo-dark.png" width="200" height="200" />
    </NuxtLink>
    <div class="header-contents">
      <h1>{{ title }}</h1>
      <h2>{{ description }}</h2>
      <a v-if="github" :href="`https://github.com/${github}`" target="_blank">
        <img src="~/assets/github.png" width="32px" height="32px" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
}

.header.logo {
  width: 200px;
  height: 200px;
}

.header-contents {
  margin-left: 2rem;
}
</style>
