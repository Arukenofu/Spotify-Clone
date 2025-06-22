<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { currentPlaybackStore, useAudioStream } from '@/features/MediaPlayer'
import Loading from '@/shared/components/Loading.vue'

const stream = reactive(useAudioStream())
const currentPlayback = currentPlaybackStore()

const video = useTemplateRef('videoRef')
const isVideoLoading = ref(false)

function loadVideo() {
  isVideoLoading.value = true
  const url = `/api/video?name=${encodeURIComponent(currentPlayback.currentTrack!.name)}&artist=${encodeURIComponent(currentPlayback.currentTrack!.artists[0].name!)}&startTime=${Math.floor(stream.currentTime)}`
  if (video.value) {
    video.value.src = url
  }
}
function videoWaiting() {
  isVideoLoading.value = true
}
function videoCanPlay() {
  isVideoLoading.value = false
}

watch(() => stream.currentTime, () => {
  if (!video.value || !stream.instance)
    return

  const diff = Math.abs(video.value.currentTime - stream.instance.currentTime)
  if (diff > 0.1) {
    video.value.currentTime = stream.instance.currentTime
  }
})

watch(() => stream.isPlaying, (value) => {
  if (!video.value)
    return

  value ? video.value.play() : video.value.pause()
})

watch(() => currentPlayback.currentTrack!.id, () => {
  loadVideo()
})

onMounted(loadVideo)
</script>

<template>
  <div class="video-section">
    <Loading v-if="isVideoLoading" />

    <video
      ref="videoRef"
      class="video"
      @waiting="videoWaiting"
      @canplay="videoCanPlay"
      @playing="isVideoLoading = false"
    />
  </div>
</template>

<style scoped lang="scss">
.video-section {
  width: 100%;
  height: 100%;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;

  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
