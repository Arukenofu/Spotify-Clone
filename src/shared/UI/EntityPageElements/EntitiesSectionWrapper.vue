<script setup lang="ts">

</script>

<template>
  <div class="v-section-static">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-section-static {
  margin-inline: -12px;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
          minmax(180px, 1fr)
  );
  grid-template-rows: repeat(1, minmax(0, 1fr));
}
</style>
