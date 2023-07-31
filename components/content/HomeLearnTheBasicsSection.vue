<script lang="ts" setup>
const { data } = await useAsyncData('learn-last-3', () => queryContent('/learn/').limit(3).find())
</script>

<template>
  <section flex="~ col" gap-6>
    <div px-6 py-8>
      <div max-w-3xl flex="~ col" gap-4>
        <p text-xl text-gray-700 font-semibold tracking-wide>
          <ContentSlot :use="$slots.eyebrow" unwrap="p" />
        </p>
        <h2 text-4xl text-gray-900 font-extrabold tracking-wide>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <p text-2.5xl leading-tight text-gray-600>
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
    </div>
    <HomeNoArticles v-if="data && data.length === 0" />
  </section>
</template>
