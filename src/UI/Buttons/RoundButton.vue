<script setup lang="ts">

</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;

  &:active {
    background-color: var(--black) !important;
  }

  &:hover {
    background-color: var(--ui-highlight);

    &:deep(.icon) {
      fill: var(--white);
    }
  }
}

button {
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    .text {
      color: var(--white);
    }
  }
}
</style>