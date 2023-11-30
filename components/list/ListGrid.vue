<script lang="ts" setup generic="T extends { title: string }">
withDefaults(defineProps<{
  items?: T[]
  itemsNotFound?: string
}>(), {
  itemsNotFound: 'No items found',
})
</script>

<template>
  <ol class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 place-items-stretch">
    <li v-for="item in items" :key="item.title">
      <slot :item="item" />
    </li>
    <li v-if="items && items.length === 0" class="col-span-1 md:col-span-2 xl:col-span-3 text-center">
      {{ itemsNotFound }}
    </li>
  </ol>
</template>
