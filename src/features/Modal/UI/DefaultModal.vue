<script setup lang="ts">

</script>

<template>
  <div class="v-modal">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-modal {
  background-color: var(--ui-highlight);
  border-radius: 8px;
  padding: 24px;
}
</style>
