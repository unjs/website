<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const website = useWebsite()
const github = website.value.socials.github

const navigation = [
  {
    path: '/packages',
    title: 'Packages',
  },
  runtimeConfig.public.learn && {
    path: '/learn',
    title: 'Learn',
  },
  {
    path: '/blog',
    title: 'Blog',
  },
  {
    path: '/relations',
    title: 'Relations',
  },
].filter(Boolean) as { path: string, title: string }[]

const { data: stars } = await useFetch('/api/content/packages.json', {
  transform: (data) => {
    const stars: number = data.reduce((acc, curr) => acc + curr.stars, 0)

    return stars
  },
})

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

const uiButton = { font: 'font-semibold', color: { gray: { ghost: 'text-gray-950 hover:bg-primary/60 dark:text-gray-50 dark:hover:bg-primary/40' } } }
const activeClassButton = 'bg-primary bg-opacity-40 dark:bg-opacity-30'

function toDesignKit() {
  navigateTo('/design-kit?utm_source=unjs.io&utm_medium=header-icon')
}
</script>

<template>
  <div class="h-16 border-b border-gray-100 dark:border-gray-800">
    <header class="h-full px-4 container mx-auto xl:max-w-7xl md:px-6 grid grid-cols-2 lg:grid-cols-3 items-center bg-white/40 backdrop-blur-sm dark:bg-gray-900/60">
      <div class="flex items-center">
        <NuxtLink to="/?utm_source=unjs.io&utm_medium=header-icon&utm_campaign=unjs.io" @click.right.prevent="toDesignKit()">
          <AppLogo />
        </NuxtLink>
      </div>

      <nav v-if="navigation" class="hidden lg:flex justify-center">
        <ol class="text-[1.125rem] flex gap-4 leading-5">
          <li v-for="item in navigation" :key="item.path">
            <!-- <UPopover v-if="item.children" mode="hover" :ui="{ width: 'max-w-[18rem]' }">
              <UButton size="md" variant="ghost" color="gray" :to="item._path" :icon="item.icon" :ui="{ size: { md: 'text-base' }, ...uiButton }" :active-class="activeClassButton">
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
            </UPopover> -->
            <UButton size="md" variant="ghost" color="gray" :to="item.path" :ui="{ size: { md: 'text-base' }, ...uiButton }" :active-class="activeClassButton">
              {{ item.title }}
            </UButton>
          </li>
        </ol>
      </nav>

      <div class="flex justify-end items-center">
        <UTooltip text="Open Search" :shortcuts="[metaSymbol, 'K']" :popper="{ adaptative: false, placement: 'bottom', strategy: 'absolute' }">
          <UButton size="md" icon="i-heroicons-magnifying-glass" color="gray" variant="ghost" :ui="{ size: { md: 'text-base' }, ...uiButton }" aria-label="Open Search" square @click="openSearch = true" />
        </UTooltip>

        <UTooltip class="ml-1 lg:hidden" text="Open Navigation" :popper="{ adaptative: false, placement: 'bottom', strategy: 'absolute' }">
          <UButton square size="md" variant="ghost" color="gray" icon="i-heroicons-bars-3-bottom-right" :ui="uiButton" aria-label="Open Navigation" @click="openNavigation = true" />
        </UTooltip>

        <UTooltip class="ml-1 hidden lg:flex" text="GitHub Stars" :popper="{ adaptative: false, placement: 'bottom', strategy: 'absolute' }">
          <UButton size="md" variant="ghost" color="gray" :icon="github.icon" :to="github.url" :target="github.target" :aria-label="`Follow us on ${github.name}`" :ui="{ size: { md: 'text-base' }, ...uiButton }">
            {{ stars ? formatNumber(stars) : '' }}
          </UButton>
        </UTooltip>
      </div>
    </header>
    <NavigationModal v-if="navigation" v-model:open="openNavigation" :navigation="navigation" />
    <SearchModal v-model:open="openSearch" />
  </div>
</template>
