<script lang="ts" setup>
defineProps<{
  packages: {
    _path: string
    title: string
  }[]
}>()
</script>

<template>
  <ProseNavGroup icon="i-heroicons-cube-solid">
    <template #title>
      {{ packages.length > 1 ? 'Packages' : 'Package' }}
    </template>
    <template #links>
      <ol>
        <li v-for="item in packages" :key="item._path">
          <ProseNavGroupLink :to="item._path">
            <template #icon="props">
              <img :src="toPackageLogo(item.title)" :alt="`Logo of ${item.title}`" :class="props.class" width="20" height="20">
            </template>
            <span>{{ item.title }}</span>
          </ProseNavGroupLink>
        </li>
      </ol>
    </template>
  </ProseNavGroup>
</template>
