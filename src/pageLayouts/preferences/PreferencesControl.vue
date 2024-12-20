<script setup lang="ts">

</script>

<template>
  <div class="control">
    <h2 class="control-name">
      <slot name="name" />
    </h2>
    <slot name="section" />
  </div>
</template>

<style scoped lang="scss">
.control {
  display: grid;
  gap: 8px;
  user-select: none;

  .control-name {
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>