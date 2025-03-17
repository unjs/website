<template>
  <AppAlert title="Note">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </AppAlert>
</template>
