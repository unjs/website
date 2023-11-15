<template>
  <main class="my-16">
    <div v-if="$slots.header" class="mb-16">
      <slot name="header" />
    </div>

    <slot />
  </main>
</template>
