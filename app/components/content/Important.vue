<template>
  <AppAlert title="Important">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </AppAlert>
</template>
