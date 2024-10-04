<script setup lang="ts">
defineProps<{
  currentColor: string;
  height?: string;
}>();
</script>

<template>
  <div class="background-noise" />
</template>

<style lang="scss" scoped>
.background-noise {
  --background-noise: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');
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
