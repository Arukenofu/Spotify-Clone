<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  active: boolean;
  component: Component;
}

defineProps<Props>();
</script>

<template>
  <button
    class="link"
    :class="active && 'active'"
  >
    <Component
      :is="component"
      class="icon"
      :state="active"
    />
    <span class="text"><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
.link {
  background: inherit;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;

  .text,
  .icon {
    transition-property: opacity, scale;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  .icon {
    fill: var(--text-soft);
    width: 24px;
    height: 24px;
  }

  .text {
    font-size: 0.65rem;
    font-weight: 600;
    text-align: center;
    color: var(--text-soft);
  }

  .logo {
    width: 22px;
    height: 22px;
  }

  &:active {
    opacity: 0.75;
    scale: 0.94;
  }

  @media (hover: hover) {
    &:hover .icon,
    &:hover .text {
      opacity: 0.75;
    }
  }
}

.active {
  .icon {
    fill: var(--white);
  }
  .text {
    color: var(--white);
  }
}
</style>
