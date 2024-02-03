<template>
  <AppAlert title="Warning">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </AppAlert>
</template>
