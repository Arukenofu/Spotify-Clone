<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  to: string;
  icon: Component;
  isMinimized: boolean;
}>();
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      active-class="active"
    >
      <Component
        :is="icon"
        class="icon"
      />
      <span
        v-if="!isMinimized"
        class="text"
      >
        <slot />
      </span>
    </RouterLink>
  </li>
</template>

<style lang="scss" scoped>
li {
  padding: 4px 12px;
  height: 48px;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    &:hover {
      .icon {
        fill: var(--white);
      }
      .text {
        color: var(--white);
      }
    }

    &:deep(.icon) {
      width: 24px;
      height: 24px;
      fill: var(--text-soft);
      transition: fill 0.2s linear;
    }

    .text {
      transition: color 0.2s linear;
      color: var(--text-soft);
      font-weight: 600;
      font-size: 1rem;
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
}
</style>
