<template>
  <div class="prose prose-zinc dark:prose-invert max-w-none">
    <slot />
  </div>
</template>

<style scoped>
.prose :deep(:first-child) {
  margin-top: 0;
}
.prose :deep(:last-child) {
  margin-bottom: 0;
}
</style>
