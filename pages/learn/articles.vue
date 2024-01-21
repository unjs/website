<script setup lang="ts">
const { fetchArticles, reset, articles, q, categories, categoriesOptions, packages, packagesOptions, order, orderBy, orderByOptions, selectedOrderBy } = useLearnArticles()

await fetchArticles()

// Disable auto URL Plausible, send one when a filter is updated (track q using a watchDebouced)
</script>

<template>
  <UInput v-model="q" color="gray" variant="outline" size="lg" placeholder="Search..." />
  <USelectMenu
    v-model="categories" :options="categoriesOptions" option-attribute="label" value-attribute="id" color="gray" variant="outline" size="lg" placeholder="Categories" select-class="cursor-pointer" multiple
  />
  <USelectMenu
    v-model="packages" :options="packagesOptions" color="gray" variant="outline" size="lg" placeholder="Packages" select-class="cursor-pointer" multiple
  >
    <template #option="{ option }">
      <UAvatar size="2xs" :src="`/assets/logos/${option}.svg`" :alt="`Icon of ${option}`" />
      <span class="truncate">
        {{ option }}
      </span>
    </template>
  </USelectMenu>
  <!-- TODO: Move to a component -->
  <UButton
    :icon="order === 1 ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'"
    color="gray"
    variant="solid"
    :title="order === 1 ? 'Ascending order' : 'Descending order'"
    @click="order = order === 1 ? -1 : 1"
  />
  <USelectMenu
    v-model="orderBy"
    :options="orderByOptions"
    color="gray"
    variant="outline"
    placeholder="Order By"
    select-class="cursor-pointer"
    value-attribute="id"
    option-attribute="label"
  >
    <template v-if="selectedOrderBy" #label>
      {{ selectedOrderBy.label }}
    </template>
  </USelectMenu>
  <UTooltip text="Reset filter">
    <UButton
      size="lg"
      color="gray"
      variant="solid"
      title="Reset filter"
      icon="i-heroicons-arrow-path-20-solid"
      @click="reset"
    />
  </UTooltip>
  {{ articles }}
</template>
