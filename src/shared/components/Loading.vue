<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  size?: CSSProperties['width']
  distance?: CSSProperties['width']
  position?: CSSProperties['position']
}

const {
  size = '12px',
  distance = '16px',
  position = 'relative',
} = defineProps<Props>()
</script>

<template>
  <div class="loader" :style="`position: ${position}`" />
</template>

<style lang="scss" scoped>
  .loader {
    --loader-color: rgba(255, 255, 255, 0.64);
    --loader-color-soft: rgba(255, 255, 255, 0.31);

    --distance: v-bind('distance');
    --negative-distance: calc(v-bind('distance') * -1);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: v-bind('size');
    aspect-ratio: 1;
    border-radius: 50%;
    animation: l5 1s infinite linear alternate;
    overflow: visible;
    scale: 1;
  }

  @keyframes l5 {
    0%  {box-shadow: var(--distance) 0 var(--loader-color), var(--negative-distance) 0 var(--loader-color-soft);background: var(--loader-color) }
    33% {box-shadow: var(--distance) 0 var(--loader-color), var(--negative-distance) 0 var(--loader-color-soft);background: var(--loader-color-soft)}
    66% {box-shadow: var(--distance) 0 var(--loader-color-soft),var(--negative-distance) 0 var(--loader-color); background: var(--loader-color-soft)}
    100%{box-shadow: var(--distance) 0 var(--loader-color-soft),var(--negative-distance) 0 var(--loader-color); background: var(--loader-color) }
  }
</style>
