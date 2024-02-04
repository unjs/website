<script lang="ts" setup>
const legend = [{
  color: 'bg-yellow-300 ring-yellow-500 dark:bg-yellow-900 dark:ring-yellow-600',
  text: 'Selected packages',
}, {
  color: 'bg-cyan-300 ring-cyan-500 dark:bg-cyan-900 dark:ring-cyan-600',
  text: 'UnJS Packages',
}, {
  color: 'bg-pink-300 ring-pink-500 dark:bg-pink-900 dark:ring-pink-800',
  text: 'Used as dependencies',
}, {
  color: 'bg-purple-300 ring-purple-500 dark:bg-purple-900 dark:ring-purple-800',
  text: 'Used as devDependencies',
}]
</script>

<template>
  <div class="absolute bottom-4 left-4">
    <UCard :ui="{ background: 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60', divide: '', shadow: 'shadow-sm', rounded: 'rounded-lg', body: { padding: 'p-4 sm:p-4' } }">
      <template v-for="item in legend" :key="item.text">
        <div class="flex items-center gap-2">
          <span class="block rounded-full w-2 h-2 ring-1" :class="item.color" />
          <span class="text-sm text-gray-500 dark:text-gray-400"> {{ item.text }}</span>
        </div>
      </template>
    </UCard>
  </div>
</template>
