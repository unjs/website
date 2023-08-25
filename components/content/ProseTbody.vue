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
  --at-apply: bg-gray-300 bg-op-10;
}
</style>
