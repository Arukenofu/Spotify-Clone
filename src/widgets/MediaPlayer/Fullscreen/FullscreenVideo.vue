<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue'
import { currentPlaybackStore, useAudioStream } from '@/features/MediaPlayer'
import Loading from '@/shared/components/Loading.vue'

const props = defineProps<{
  videoId: string | null
}>()

const stream = reactive(useAudioStream())
const currentPlayback = currentPlaybackStore()

const video = useTemplateRef('videoRef')
const isVideoLoading = ref(false)

function loadVideo() {
  isVideoLoading.value = true
  if (props.videoId) {
    const url = `/api/video/${props.videoId}`
    if (video.value) {
      video.value.src = url
    }
  }
  else {
    const url = `/api/video?name=${encodeURIComponent(currentPlayback.currentTrack!.name)}&artist=${encodeURIComponent(currentPlayback.currentTrack!.artists[0].name!)}&startTime=${Math.floor(stream.currentTime)}`
    if (video.value) {
      video.value.src = url
    }
  }
}
function videoWaiting() {
  isVideoLoading.value = true
}
function videoCanPlay() {
  isVideoLoading.value = false
}

watch(() => stream.currentTime, async () => {
  if (!video.value || !stream.instance)
    return

  const diff = Math.abs(video.value.currentTime - stream.instance.currentTime)
  if (diff > 0.1) {
    stream.pause()
    await new Promise(resolve => setTimeout(resolve, 2000))
    video.value.currentTime = stream.instance.currentTime
    stream.play()
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

    <Transition name="fade">
      <video
        v-show="!isVideoLoading"
        ref="videoRef"
        class="video"
        @waiting="videoWaiting"
        @canplay="videoCanPlay"
        @playing="isVideoLoading = false"
      />
    </Transition>
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
</style>
