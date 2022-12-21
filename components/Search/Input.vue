<script setup lang="ts">
defineProps({
  search: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:search'])

const updateSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:search', target.value)
}
</script>

<template>
  <div class="search">
    <SearchLogo class="logo" />
    <input 
      class="input" 
      type="text" 
      :value="search" 
      @input="updateSearch"
      v-bind="$attrs"
    >
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;

  .logo {
    --size: 1.75rem;

    position: absolute;
    top: 44%;
    left: .75rem;
    transform: translateY(-55%);

    width: var(--size);
    height: var(--size);
  }

  .input {
    width: 100%;
    background-color: hsl(var(--white) / 0.8);
    color: hsl(var(--black));
    margin-bottom: .75rem;
    border: 1px dashed hsl(var(--black));

    padding: 1.25rem 1.25rem 1.25rem 2.75rem;
    font-size: 1.25rem;
    line-height: 1.2;

    &:focus {
      outline: none;
      border: 1px solid hsl(var(--black));
    }

    &:disabled {
      background-color: hsl(var(--black-muted));
      cursor: not-allowed;

      &::placeholder {
        color: hsl(var(--yellow));
        opacity: .50;
      }
    }
  }
}
</style>
