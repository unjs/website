<script lang="ts" setup>
const { data: packages } = await useFetch('/api/content/packages.json', {
  transform: (data) => {
    const packages: number = data.length
    const stars: number = data.reduce((acc, curr) => acc + curr.stars, 0)
    const monthlyDownloads: number = data.reduce((acc, curr) => acc + (curr.monthlyDownloads ?? 0), 0)

    return {
      packages,
      stars,
      monthlyDownloads,
    }
  },
})

const { data: followers } = await useFetch('/api/github/followers')
</script>

<template>
  <section class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center justify-center">
    <h2 class="max-w-sm lg:max-w-none text-center lg:text-left text-2xl md:text-3xl lg:text-4xl text-gray-950 dark:text-gray-50 font-bold tracking-wide lg:leading-[3rem]">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <HomeNumbersItem v-if="packages" text="Packages" :value="packages?.packages" />
      <HomeNumbersItem v-if="packages" text="Stars" :value="packages?.stars" />
      <HomeNumbersItem v-if="packages" text="Monthly Downloads" :value="packages?.monthlyDownloads" />
      <HomeNumbersItem v-if="followers" text="Followers on GitHub" :value="followers" />
    </div>
  </section>
</template>
