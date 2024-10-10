<script setup lang="ts"></script>

<template>
  <button v-bind="$attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  background-color: var(--main-color);
  border: none;
  padding: 15px 0;
  color: var(--ui);
  font-weight: 700;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
}
</style>
