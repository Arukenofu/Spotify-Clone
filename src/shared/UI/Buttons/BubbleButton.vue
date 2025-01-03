<script setup lang="ts">

const {design = 'default'} = defineProps<{
  design?: 'default' | 'active' | 'none' | 'green' | 'border';
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
  transform: translate3d(0px, 0px, 0px);
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

.border {
  background: none;
  border: 1px solid #7c7c7c;

  &:hover {
    scale: 1.04;
    border: 1px solid var(--white);
  }
}

.none {
  background-color: transparent;
  color: var(--black);
}
</style>
