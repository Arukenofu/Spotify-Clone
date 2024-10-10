<script setup lang="ts"></script>

<template>
  <button class="v-form-button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.v-form-button {
  width: 100%;
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
