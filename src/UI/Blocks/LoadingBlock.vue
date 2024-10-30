<script setup lang="ts">
import LoadingComponent from "@/features/InfoPanel/components/LoadingComponent.vue";
</script>

<template>
  <div class="v-loading">
    <LoadingComponent class="" />
  </div>
</template>

<style scoped lang="scss">
.v-loading {
  position: absolute;
  inset: 0;
}
</style>