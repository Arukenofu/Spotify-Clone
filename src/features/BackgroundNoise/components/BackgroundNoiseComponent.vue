<script setup lang="ts">
defineProps<{
  currentColor: string
  height?: string
}>()
</script>

<template>
  <div class="background-noise" />
</template>

<style lang="scss" scoped>
.background-noise {
  background-color: v-bind('currentColor');
  background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, var(--ui) 100%),
    var(--background-noise);

  transition-duration: 1s;
  transition-property: background;
  transition-timing-function: ease;

  height: v-bind('height || "320px"');
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
