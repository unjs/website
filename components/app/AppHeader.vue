<script lang="ts" setup>
const website = useWebsite()
const github = website.value.socials.github

const { data: navigation } = await useAsyncData('content:navigation', () => fetchContentNavigation(queryContent('/')), {
  transform: (data) => {
    const filteredData = data.filter(item => item._path !== '/').map((item) => {
      if (item._path !== '/resources' && item._path !== '/community')
        delete item.children

      return {
        title: item.title,
        _path: item._path,
        icon: item.icon,
        children: item.children,
      }
    })

    return filteredData
  },
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
const uiButton = { font: 'font-semibold', color: { gray: { ghost: 'hover:bg-primary/30 dark:hover:bg-primary/90' } } }
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
          <UPopover v-if="item.children" mode="hover" :ui="{ width: 'max-w-[18rem]' }">
            <UButton size="md" variant="ghost" color="gray" :to="item._path" :icon="item.icon" :ui="{ size: { md: 'text-base' }, ...uiButton }" active-class="bg-primary bg-opacity-30">
              {{ item.title }}
            </UButton>

            <template #panel>
              <ol class="p-2">
                <li v-for="child in item.children" :key="child._path">
                  <ULink :to="child._path" class="px-3 py-2 flex flex-col hover:bg-primary/30 dark:hover:bg-primary/90 transition ease-in rounded-md text-base">
                    <span class="flex flex-row gap-2 items-center">
                      <span :class="child.icon" class="h-5 w-5" />
                      <span class="text-zinc-700 hover:text-zinc-800 font-medium"> {{ child.title }} </span>
                    </span>

                    <span class="ml-7 text-zinc-500 text-sm"> {{ child.description }} </span>
                  </ULink>
                </li>
              </ol>
            </template>
          </UPopover>
          <UButton v-else size="md" variant="ghost" color="gray" :to="item._path" :icon="item.icon" :ui="{ size: { md: 'text-base' }, ...uiButton }" active-class="bg-primary bg-opacity-30">
            {{ item.title }}
          </UButton>
        </li>
      </ol>
    </nav>

    <div class="flex justify-end items-center gap-1">
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

      <UTooltip text="GitHub Stars">
        <UButton size="md" variant="ghost" color="gray" :icon="github.icon" :to="github.url" :target="github.target" :aria-label="`Follow us on ${github.name}`" :ui="{ size: { md: 'text-base' }, ...uiButton }" class="hidden lg:flex">
          {{ stars ? formatNumber(stars) : '' }}
        </UButton>
      </UTooltip>
    </div>
  </header>
  <AppNavigationDialog v-if="navigation" v-model:open="openNavigation" :navigation="navigation" />
  <AppSearchDialog v-model:open="openSearch" />
</template>
