<script setup lang="ts">
import useInfoContentStore from "@/features/InfoPanel/store/useInfoContentStore";

const {currentPanelComponent} = useInfoContentStore();
</script>

<template>
  <Component :is="currentPanelComponent" />
</template>

<style scoped>

</style>