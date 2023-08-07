<script lang="ts" setup>
const { data } = await useAsyncData('learn-last-3', () => queryContent('/learn/').limit(3).find())
</script>

<template>
  <section flex="~ col" gap-6>
    <div py-8>
      <div max-w-3xl flex="~ col" gap-4>
        <p text="gray-700 md:xl" font-semibold tracking-wide>
          <ContentSlot :use="$slots.eyebrow" unwrap="p" />
        </p>
        <h2 text="gray-900 2xl md:3xl lg:4xl" font-extrabold tracking-wide>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <p text="gray-600 lg md:2.5xl" leading-tight>
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
    </div>
    <HomeNoArticles v-if="data && data.length === 0" />
  </section>
</template>
