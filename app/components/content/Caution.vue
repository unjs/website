<template>
  <AppAlert title="Caution">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </AppAlert>
</template>
