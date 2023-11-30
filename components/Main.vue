<template>
  <main class="my-8 lg:my-16">
    <div v-if="$slots.header" class="mb-8 lg:mb-16">
      <slot name="header" />
    </div>

    <slot />
  </main>
</template>
