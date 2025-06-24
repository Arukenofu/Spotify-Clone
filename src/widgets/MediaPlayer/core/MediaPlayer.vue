<script setup lang="ts">
import { onMounted, provide, reactive, watch } from 'vue'
import { currentPlaybackStore, useAudioStream, usePlaybackControls } from '@/features/MediaPlayer'
import { userPreferencesStore } from '@/features/UserPreferences'
import useScreen from '@/shared/composables/useScreen'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString'
import AdditionalControls from '@/widgets/MediaPlayer/components/AdditionalControls.vue'
import AdditionalControlsNone from '@/widgets/MediaPlayer/components/AdditionalControlsNone.vue'
import TrackControls from '@/widgets/MediaPlayer/components/TrackControls.vue'
import TrackControlsNone from '@/widgets/MediaPlayer/components/TrackControlsNone.vue'
import TrackDetails from '@/widgets/MediaPlayer/components/TrackDetails.vue'
import TrackDetailsNone from '@/widgets/MediaPlayer/components/TrackDetailsNone.vue'
import FullScreen from '@/widgets/MediaPlayer/Fullscreen/FullScreen.vue'

const { isFullscreen, enableFullscreen, exitFullScreen } = useScreen()

const preferences = userPreferencesStore()
const currentPlayback = currentPlaybackStore()

const stream = reactive(useAudioStream())
const controls = reactive(usePlaybackControls())

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.repeat)
    return

  if (event.code === 'Space') {
    event.preventDefault()
  }
})

watch([() => currentPlayback.currentTrackId, () => currentPlayback.currentPlaybackInfo?.id], () => {
  stream.loadTrack(
    currentPlayback.currentTrack!.name,
    getCommaSeparatedString(currentPlayback.currentTrack!.artists, 'name'),
  ).then(stream.play)
})

onMounted(() => {
  const el = new Audio()
  el.preload = 'none'
  el.crossOrigin = 'anonymous'
  el.volume = stream.volume

  el.addEventListener('loadedmetadata', () => {
    stream.duration = Number.isFinite(el.duration) ? el.duration : 0
  })

  el.addEventListener('ended', () => {
    if (preferences.currentRepeatMode === 'repeatCurrentPlaylist') {
      controls.nextTrack()
      return
    }

    if (preferences.currentRepeatMode === 'repeatCurrentMusic') {
      stream.play()
    }
  })

  el.addEventListener('timeupdate', () => {
    stream.currentTime = el.currentTime
  })

  el.addEventListener('play', () => stream.isPlaying = true)
  el.addEventListener('pause', () => stream.isPlaying = false)

  stream.instance = el
})

provide('enableFullScreenFunc', enableFullscreen)
provide('exitFullScreenFunc', exitFullScreen)
</script>

<template>
  <FullScreen v-if="isFullscreen" />

  <div v-if="currentPlayback.currentTrack" v-show="!isFullscreen" class="player">
    <TrackDetails />
    <TrackControls />
    <AdditionalControls />
  </div>

  <div v-else class="player disabled">
    <TrackDetailsNone />
    <TrackControlsNone />
    <AdditionalControlsNone />
  </div>
</template>

<style lang="scss" scoped>
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--player-height);
  padding: 0 14px;
  z-index: 2;
  background-color: var(--black);
}

.disabled {
  cursor: not-allowed;
  user-select: none;

  &:deep() > div {
    opacity: .5;
  }

  :deep(.icon) {
    cursor: not-allowed !important;
  }
}

:deep(.icon) {
  height: 32px;
  width: 32px;
  display: grid;
  place-items: center;
  background: none;
  border: none;
  fill: var(--text-soft);
  cursor: pointer;

  &:hover,
  &:active {
    fill: var(--white);
  }

  svg {
    height: 16px;
    width: 16px;
  }
}
</style>
