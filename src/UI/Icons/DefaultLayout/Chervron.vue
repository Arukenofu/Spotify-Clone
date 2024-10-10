<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  direction: 'left' | 'right';
}>();

const computeDirection = computed(() => {
  if (props.direction === 'right') {
    return 180;
  }

  return 0;
});
</script>

<template>
  <svg
    :style="`rotate: ${computeDirection}deg`"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_502_112)">
      <path
        d="M15 6L9 12L15 18"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped></style>
