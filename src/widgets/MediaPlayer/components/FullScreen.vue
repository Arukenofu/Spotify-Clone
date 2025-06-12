<script setup lang="ts">
import FullscreenInfo from "@/widgets/MediaPlayer/components/FullscreenInfo.vue";
import FullscreenControls from "@/widgets/MediaPlayer/components/FullscreenControls.vue";
</script>

<template>
  <Teleport to="body">
    <div class="v-fullscreen">
      <FullscreenInfo />
      <FullscreenControls />
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.v-fullscreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>