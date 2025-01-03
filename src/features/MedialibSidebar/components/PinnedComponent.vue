<script setup lang="ts">
import PinIcon from "@/shared/UI/Icons/PinIcon.vue";
</script>

<template>
  <span class="v-pinned">
    <PinIcon class="icon" />
  </span>
</template>

<style scoped lang="scss">
.v-pinned {
  .icon {
    width: 12px;
    height: 12px;
    fill: var(--main-color);
  }
}
</style>