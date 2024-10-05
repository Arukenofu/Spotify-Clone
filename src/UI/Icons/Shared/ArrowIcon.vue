<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  direction: 'top' | 'bottom' | 'left' | 'right';
}>();

const directionRotate = computed(() => {
  if (props.direction === 'top') {
    return '-90deg';
  }
  if (props.direction === 'bottom') {
    return '90deg';
  }
  if (props.direction === 'left') {
    return '180deg';
  }

  return '0deg';
});
</script>

<template>
  <svg
    :style="`transform: rotate(${directionRotate})`"
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    class="Svg-sc-ytk21e-0 cAMMLk"
  >
    <path
      d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"
    />
  </svg>
</template>

<style scoped></style>
