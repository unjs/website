<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  path: string
  stars: number
  monthlyDownloads: number | null
  contributors: number | null
}>()
</script>

<template>
  <UCard as="article" :ui="{ base: 'h-full relative flex flex-col', background: 'bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 hover:dark:bg-gray-700/60', divide: '', shadow: 'shadow-sm', ring: 'dark:highlight-white/10 dark:ring-0', rounded: 'rounded-lg', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { base: 'grow', padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
    <template #header>
      <img :src="toPackageLogo(title!)" :alt="`Logo of ${title}`" w-12 h-12>
      <h3 class="text-gray-950 dark:text-gray-50 text-xl font-semibold">
        <NuxtLink :to="path" class="absolute inset-0" />
        {{ title }}
      </h3>
    </template>

    <p class="dark:text-gray-400">
      {{ description }}
    </p>

    <template #footer>
      <dl class="grid grid-cols-3 text-sm text-gray-400 font-semibold">
        <div>
          <dt class="sr-only">
            Stars
          </dt>
          <dd class="flex items-center gap-1">
            <span class="i-heroicons-star-20-solid h-[0.875rem] w-[0.875rem]" />
            <span>
              {{ formatNumber(stars) }}
            </span>
          </dd>
        </div>
        <div class="place-self-center">
          <template v-if="monthlyDownloads">
            <dt class="sr-only">
              Monthly Downloads
            </dt>
            <dd class="flex items-center gap-1">
              <span class="i-heroicons-arrow-trending-up-solid h-[0.875rem] w-[0.875rem]" />
              <span>
                {{ formatNumber(monthlyDownloads) }}
              </span>
            </dd>
          </template>
        </div>
        <div class="place-self-end">
          <template v-if="contributors">
            <dt class="sr-only">
              Contributors
            </dt>
            <dd class="flex items-center gap-1">
              <span class="i-heroicons-user-group-20-solid h-[0.875rem] w-[0.875rem]" />
              <span>
                {{ formatNumber(contributors) }}
              </span>
            </dd>
          </template>
        </div>
      </dl>
    </template>
  </UCard>
</template>
