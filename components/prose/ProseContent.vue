<template>
  <div class="prose prose-zinc dark:prose-invert max-w-none">
    <slot />
  </div>
</template>

<style scoped>
.prose :deep(:first-child) {
  margin-top: 0;
}
</style>
