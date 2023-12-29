<script lang="ts" setup>
import type { Author } from '~/types/blog'

defineProps<{
  path: string
  title: string
  description: string
  publishedAt: string
  authors: Author[]
}>()
</script>

<template>
  <UCard as="article" :ui="{ base: 'h-full relative', background: 'bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 hover:dark:bg-gray-700/60', divide: '', shadow: 'shadow-sm', ring: 'dark:highlight-white/10', rounded: 'rounded-lg', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
    <template #header>
      <h3 class="text-xl font-semibold dark:text-gray-50">
        <NuxtLink :to="path" class="absolute inset-0" />
        {{ title }}
      </h3>
    </template>

    <p class="dark:text-zinc-400">
      {{ description }}
    </p>

    <template #footer>
      <dl class="dark:text-zinc-400 text-sm flex flex-row justify-between items-center">
        <dt class="sr-only">
          Published at
        </dt>
        <dd>
          <time :datetime="toISODateString(publishedAt)">
            {{ toLocaleDateString(publishedAt) }}
          </time>
        </dd>
        <dt class="sr-only">
          Authors
        </dt>
        <dd class="flex">
          <UAvatarGroup size="2xs" :max="3" :ui="{ ring: '' }">
            <UAvatar v-for="author in authors" :key="author.name" :src="author.picture" :alt="author.name" />
          </UAvatarGroup>
        </dd>
      </dl>
    </template>
  </UCard>
</template>
