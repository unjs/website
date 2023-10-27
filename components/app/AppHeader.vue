<script lang="ts" setup>
const website = useWebsite()
const github = website.value.socials.github
const x = website.value.socials.x

const { data: navigation } = await useAsyncData('content:navigation', () => fetchContentNavigation(queryContent('/')), {
  transform: data => data.filter(item => item._path !== '/').map((item) => {
    const { title, icon, _path } = item
    return { title, icon, _path }
  }),
})
const { data: stars } = await useFetch('/api/github/stars')

const openNavigation = ref(false)
const openSearch = ref(false)

defineShortcuts({
  meta_k: {
    handler: () => {
      openSearch.value = true
    },
  },
})

const { metaSymbol } = useShortcuts()
const uiButton = { color: { gray: { ghost: 'hover:bg-primary/10 dark:hover:bg-primary/90' } } }
</script>

<template>
  <header class="h-[3.75rem] px-3 md:px-6 py-3 grid grid-cols-2 lg:grid-cols-3 rounded-2xl ring-1 ring-zinc-100 bg-white text-zinc-900">
    <div class="flex items-center">
      <NuxtLink to="/?utm_source=unjs.io&utm_medium=header-icon">
        <AppLogo />
      </NuxtLink>
    </div>

    <nav v-if="navigation" class="hidden lg:flex justify-center">
      <ol class="text-[1.125rem] flex gap-4 leading-5">
        <li v-for="item in navigation" :key="item._path">
          <UButton size="md" variant="ghost" color="gray" :to="item._path" :icon="item.icon" :ui="{ size: { md: 'text-base' }, ...uiButton }" active-class="bg-primary bg-opacity-30">
            {{ item.title }}
          </UButton>
        </li>
      </ol>
    </nav>

    <div class="flex justify-end items-center gap-3">
      <UTooltip text="Open Search" :shortcuts="[metaSymbol, 'K']">
        <UButton size="md" icon="i-heroicons-magnifying-glass-solid" color="gray" variant="ghost" :ui="{ size: { md: 'text-base' }, ...uiButton }" @click="openSearch = true">
          <span class="hidden lg:inline">
            Search
          </span>
        </UButton>
      </UTooltip>
      <UTooltip text="Open Navigation">
        <UButton size="md" variant="ghost" color="gray" icon="i-heroicons-bars-3-bottom-right" class="lg:hidden" :ui="uiButton" @click="openNavigation = true" />
      </UTooltip>

      <div class="flex items-center">
        <UButton size="md" variant="ghost" color="gray" :icon="x.icon" :to="x.url" :target="x.target" :aria-label="`Follow us on ${x.name}`" :ui="uiButton" class="hidden lg:flex" />
        <UTooltip text="GitHub Stars">
          <UButton size="md" variant="ghost" color="gray" :icon="github.icon" :to="github.url" :target="github.target" :aria-label="`Follow us on ${github.name}`" :ui="uiButton" class="hidden lg:flex">
            {{ stars ? formatNumber(stars) : '' }}
          </UButton>
        </UTooltip>
      </div>
    </div>
  </header>
  <AppNavigationDialog v-if="navigation" v-model:open="openNavigation" :navigation="navigation" />
  <AppSearchDialog v-model:open="openSearch" />
</template>
