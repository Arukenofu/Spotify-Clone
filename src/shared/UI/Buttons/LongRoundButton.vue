<script setup lang="ts">

</script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  height: 32px;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 4px 16px;
  border: none;
  transition-property: opacity, scale;
  transition-duration: 33ms;
  border-radius: 500px;
  cursor: pointer;

  &:hover {
    scale: 1.04;
  }

  &:active {
    opacity: 0.8;
    scale: 1;
  }
}
</style>
