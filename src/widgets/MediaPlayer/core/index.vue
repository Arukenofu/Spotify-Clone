<script setup lang="ts">
import { onMounted } from 'vue';
import { useCurrentMusicStore, useMusicStore } from '@/features/MediaPlayer';
import TrackDetails from '@/widgets/MediaPlayer/components/TrackDetails.vue';
import TrackControls from '@/widgets/MediaPlayer/components/TrackControls.vue';
import AdditionalControls from '@/widgets/MediaPlayer/components/AdditionalControls.vue';
import useMusicUtils from '@/features/MediaPlayer/composables/useMusicUtils';
import TrackControlsNone from '@/widgets/MediaPlayer/components/TrackControlsNone.vue';
import AdditionalControlsNone from '@/widgets/MediaPlayer/components/AdditionalControlsNone.vue';
import TrackDetailsNone from '@/widgets/MediaPlayer/components/TrackDetailsNone.vue';

const musicStore = useMusicStore();
const currentMusicStore = useCurrentMusicStore();

onMounted(() => {
  musicStore.audio = new Audio(currentMusicStore.currentAudioData.url);
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.repeat) return;

  const { toggleTrackPlaying } = useMusicUtils();

  if (event.code === 'Space') {
    toggleTrackPlaying();
    event.preventDefault();
  }
});
</script>

<template>
  <div v-if="musicStore.audio" class="player">
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
  height: var(--player-height);
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  grid-gap: var(--border-radius);
  align-items: center;
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
