<script setup lang="ts">
defineProps<{
  maskColor: string | null
}>()
</script>

<template>
  <div class="background" :style="`background-color: ${maskColor}`" />
</template>

<style scoped lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.2) 98.07%),linear-gradient(0deg,rgba(0,0,0,.1),rgba(0,0,0,.1)),transparent;
  transition: background-color 1s ease-in-out;
}
</style>
