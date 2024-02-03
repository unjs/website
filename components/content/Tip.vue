<template>
  <AppAlert title="Tip">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </AppAlert>
</template>
