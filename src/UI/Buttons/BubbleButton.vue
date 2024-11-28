<script setup lang="ts">
import type {ButtonHTMLAttributes} from "vue";

/* @vue-ignore */
interface Props extends ButtonHTMLAttributes {
}

const {design = 'default'} = defineProps<Props & {
  design?: 'default' | 'active' | 'none' | 'green';
}>();
</script>

<template>
  <button
    class="bubble-button"
    :class="design"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.bubble-button {
  display: block;
  border-radius: 500px;
  padding: 4px 12px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;
}

.default {
  background-color: #2a2a2a;
  color: var(--white);

  &:hover {
    background-color: #333333;
  }

  &:active {
    background-color: #1e1e1e;
  }
}

.active {
  background-color: var(--white);
  color: var(--black);

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #c7c7c7;
  }
}

.green {
  background-color: var(--main-color);
  color: var(--black);

  &:hover {
    scale: 1.04;
  }

  &:active {
    scale: 1;
    opacity: .9;
  }
}

.none {
  background-color: transparent;
  color: var(--black);
}
</style>
