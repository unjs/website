<template>
  <tbody>
    <slot />
  </tbody>
</template>

<style scoped>
:deep(td) {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

:deep(tr:nth-child(2n)) {
  background-color: theme('colors.zinc.300 / 10%');
}
</style>
