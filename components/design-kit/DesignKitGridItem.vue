<template>
  <div>
    <div class="ring-1 dark:ring-gray-700 rounded-md overflow-hidden h-24">
      <slot name="content" />
    </div>
    <div class="mt-1 font-semibold">
      <slot name="description" />
    </div>
  </div>
</template>
