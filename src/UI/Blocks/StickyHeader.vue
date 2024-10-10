<script setup lang="ts">
import type { CSSProperties } from 'vue';

defineProps<{
  underlayStyle?: CSSProperties;
}>();
</script>

<template>
  <div class="sticky-header">
    <div
      class="underlay"
      :style="underlayStyle"
    >
      <slot name="filter" />
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sticky-header {
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;

  .underlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
}
</style>
