<script setup lang="ts">

</script>

<template>
  <h1 class="name">
    <slot />
  </h1>
</template>

<style scoped lang="scss">
.name {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  user-select: none;
  font-size: 6em;
  font-weight: 900;
  white-space: nowrap;
  -webkit-box-orient: vertical;
  line-height: normal;
  overflow: hidden;
  text-align: left;
  width: 100%;
  word-break: break-word;
}

@container EntityInfoHeader (max-width: 1000px) {
  .name {
    font-size: 3.5em !important;
  }
}

@container EntityInfoHeader (max-width: 700px) {
  .name {
    font-size: 2em !important;
  }
}
</style>