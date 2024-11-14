<script setup lang="ts">
</script>

<template>
  <span class="title">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.title {
  padding: 12px;
  height: 40px;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-soft);
  display: flex;
  user-select: none;
}
</style>
