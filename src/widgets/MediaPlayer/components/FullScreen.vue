<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getAccentColor } from '@/features/AccentColors'
import { currentPlaybackStore, currentTrackImage } from '@/features/MediaPlayer'
import { userPreferencesStore } from '@/features/UserPreferences'
import FullscreenBackground from '@/widgets/MediaPlayer/components/FullscreenBackground.vue'
import FullscreenControls from '@/widgets/MediaPlayer/components/FullscreenControls.vue'
import FullscreenInfo from '@/widgets/MediaPlayer/components/FullscreenInfo.vue'
import FullscreenVideo from '@/widgets/MediaPlayer/components/FullscreenVideo.vue'

const currentPlayback = currentPlaybackStore()
const preferences = userPreferencesStore()

const isValid = computed(() => {
  return currentPlayback.currentPlaybackInfo && currentPlayback.currentPlaybackType && currentPlayback.currentTrack
})

const maskColor = ref(await getAccentColor(
  currentTrackImage(currentPlayback.currentPlaybackInfo!, currentPlayback.currentTrack!, 2) || '',
))

watch(() => currentPlayback.currentTrackId, async () => {
  maskColor.value = await getAccentColor(
    currentTrackImage(currentPlayback.currentPlaybackInfo!, currentPlayback.currentTrack!, 2) || '',
  )
})
</script>

<template>
  <Teleport v-if="isValid" to="body">
    <div class="v-fullscreen">
      <FullscreenBackground
        :mask-color="maskColor"
      />

      <Transition name="fade-exit">
        <FullscreenVideo v-if="preferences.fullscreenVideoShow" />
      </Transition>

      <FullscreenInfo
        :mask-color="maskColor"
        :current-playback-name="currentPlayback.currentPlaybackInfo!.name"
        :current-playback-type="currentPlayback.currentPlaybackType!"
        :current-track-artists="currentPlayback.currentTrack!.artists"
        :current-track-image="currentTrackImage(currentPlayback.currentPlaybackInfo!, currentPlayback.currentTrack!, 0) || ''"
        :current-track-name="currentPlayback.currentTrack!.name"
        :show-general-info="!preferences.fullscreenVideoShow"
      />

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

.fade-exit-leave-from {
  opacity: 1;
}
.fade-exit-leave-to {
  opacity: 0;
}
.fade-exit-leave-active {
  transition: opacity 0.4s ease;
}
</style>
