<script setup lang="ts">
import TrackDetails from '@/widgets/MediaPlayer/components/TrackDetails.vue';
import TrackControls from '@/widgets/MediaPlayer/components/TrackControls.vue';
import AdditionalControls from '@/widgets/MediaPlayer/components/AdditionalControls.vue';
import TrackControlsNone from '@/widgets/MediaPlayer/components/TrackControlsNone.vue';
import AdditionalControlsNone from '@/widgets/MediaPlayer/components/AdditionalControlsNone.vue';
import TrackDetailsNone from '@/widgets/MediaPlayer/components/TrackDetailsNone.vue';
import FullScreen from "@/widgets/MediaPlayer/components/FullScreen.vue";
import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import useMusicUtils from '@/features/MediaPlayer/composables/useMusicUtils';
import useScreen from "@/shared/composables/useScreen";
import {provide} from "vue";

const musicStore = useMusicStore();

const {toggleTrackPlaying} = useMusicUtils();
const {isFullscreen, enableFullscreen, exitFullScreen} = useScreen();

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.repeat) return;

  if (event.code === 'Space') {
    toggleTrackPlaying();
    event.preventDefault();
  }
});

provide('enableFullScreenFunc', enableFullscreen);
provide('exitFullScreenFunc', exitFullScreen);
</script>

<template>
  <FullScreen v-if="isFullscreen" />

  <div v-else-if="musicStore.audio" class="player">
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
