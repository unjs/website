<template>
  <main class="min-h-[calc(100vh-4rem)] py-8 md:py-16">
    <div v-if="$slots.header" class="mb-8 lg:mb-16">
      <slot name="header" />
    </div>

    <slot />
  </main>
</template>
