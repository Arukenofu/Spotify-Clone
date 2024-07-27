<script setup lang="ts">

const step = defineModel<number>('step', {
  required: true
});

</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar-inner" :style="`width: ${Math.ceil(33.3333333 * step)}%`" />
  </div>
</template>

<style scoped>
.progress-bar {
  height: 3px;
  background-color: #727272;
  width: 100%;
  margin-bottom: 6px;

  .progress-bar-inner {
    height: 100%;
    background-color: var(--main-color);
  }
}
</style>