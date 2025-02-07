<script setup lang="ts">

</script>

<template>
  <div class="v-track-table">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-track-table {
  max-width: var(--content-max-width);
  padding: 0 var(--content-spacing);
  margin: 0 auto;

  :deep(.v-music-row) {
    margin-bottom: var(--content-spacing);
  }
}
</style>