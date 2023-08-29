<template>
  <thead>
    <slot />
  </thead>
</template>

<style scoped>
:deep(th) {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-color: theme('colors.gray.300');

  text-align: left;
}
</style>
