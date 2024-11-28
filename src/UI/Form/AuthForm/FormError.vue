<script setup lang="ts">
import ErrorIcon from '@/UI/Icons/Shared/ErrorIcon.vue';
</script>

<template>
  <div class="formError">
    <ErrorIcon class="svg" />

    <span>
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.formError {
  display: flex;
  gap: 4px;

  .svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    fill: #f15e6c;
  }

  span {
    position: relative;
    bottom: 3px;
    color: #f15e6c;
    line-height: 1.35;
    font-size: 0.9rem;
  }
}
</style>
