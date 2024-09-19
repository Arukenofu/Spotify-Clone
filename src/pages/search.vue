<script setup lang="ts">
import setTitle from "@/shared/utils/setTitle";

setTitle('Spotify — Поиск');
</script>

<template>
  <section class="searchSection">
    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.searchSection {
  width: 100%;
  padding: 0 var(--content-spacing);
}
</style>