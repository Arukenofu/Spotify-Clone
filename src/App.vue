<script setup lang="ts">
import DefaultLayout from "@/layouts/defaultLayout.vue";
import MediaPlayer from "@/components/MediaPlayer.vue";

</script>

<template>
  <KeepAlive>
    <audio id="coreAudio" ref="coreAudio" ></audio>
  </KeepAlive>

  <DefaultLayout>
    <Suspense>
      <RouterView />
    </Suspense>
  </DefaultLayout>

  <MediaPlayer />
</template>

<style lang="scss" scoped>

</style>
