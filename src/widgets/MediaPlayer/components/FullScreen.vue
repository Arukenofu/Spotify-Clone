<script setup lang="ts">
import FullscreenInfo from "@/widgets/MediaPlayer/components/FullscreenInfo.vue";
import FullscreenControls from "@/widgets/MediaPlayer/components/FullscreenControls.vue";
</script>

<template>
  <Teleport to="body">
    <div class="v-fullscreen">
      <div class="background" style="background-color: rgb(168, 104, 224);" />

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

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.2) 98.07%),linear-gradient(0deg,rgba(0,0,0,.1),rgba(0,0,0,.1)),transparent;
    transition: background-color 1s ease-in-out;
  }
}
</style>