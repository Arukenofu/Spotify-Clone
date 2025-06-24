<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { getAccentColor } from '@/features/AccentColors'
import { currentPlaybackStore, currentTrackImage, useAudioStream } from '@/features/MediaPlayer'
import { userPreferencesStore } from '@/features/UserPreferences'
import FullscreenBackground from '@/widgets/MediaPlayer/components/FullscreenBackground.vue'
import FullscreenControls from '@/widgets/MediaPlayer/Fullscreen/FullscreenControls.vue'
import FullscreenInfo from '@/widgets/MediaPlayer/Fullscreen/FullscreenInfo.vue'
import FullScreenPanel from '@/widgets/MediaPlayer/Fullscreen/FullScreenPanel.vue'
import FullscreenVideo from '@/widgets/MediaPlayer/Fullscreen/FullscreenVideo.vue'

const stream = reactive(useAudioStream())
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

const videoId = ref<string | null>(null)

function loadTrack(id: string) {
  videoId.value = id
  stream.loadTrack(id).then(stream.play)
}

const isPanel = ref(false)
</script>

<template>
  <Teleport v-if="isValid" to="body">
    <div class="v-fullscreen" :class="isPanel && 'with-panel'">
      <div class="main">
        <FullscreenBackground
          :mask-color="maskColor"
        />

        <Transition name="fade-transition">
          <FullscreenVideo v-if="preferences. fullscreenVideoShow" :key="videoId" :video-id="videoId" />
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

        <FullscreenControls
          :is-panel="isPanel"
          @toggle-panel="isPanel = !isPanel"
        />
      </div>

      <FullScreenPanel
        v-if="isPanel"
        :track-name="currentPlayback.currentTrack!.name"
        :artists="currentPlayback.currentTrack!.artists"
        @close="isPanel = false"
        @item-click="loadTrack"
      />
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
  display: flex;

  .main {
    z-index: 10;
    width: 100%;
    height: 100%;
    transition: width 0.2s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;

    &:deep() {
      .fade-transition-enter-from {
        opacity: 0;
      }
      .fade-transition-enter-to {
        opacity: 1;
      }
      .fade-transition-enter-active {
        transition: opacity 0.4s ease;
      }

      .fade-transition-leave-from {
        opacity: 1;
      }
      .fade-transition-leave-to {
        opacity: 0;
      }
      .fade-transition-leave-active {
        transition: opacity 0.4s ease;
      }
    }
  }
}
.with-panel .main {
  width: calc(100% - 450px) !important;
}
</style>
