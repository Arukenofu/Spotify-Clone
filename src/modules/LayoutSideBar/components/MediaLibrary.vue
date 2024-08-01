<script setup lang="ts">

import MediaLibButton from "@/modules/LayoutSideBar/UI/Button/MediaLibButton.vue";
</script>

<template>
  <div class="media-library">
    <MediaLibButton />
  </div>
</template>

<style lang="scss" scoped>
.media-library {
  flex: 1;
  background-color: var(--ui);
  border-radius: var(--border-radius);
  min-height: 400px;
}
</style>