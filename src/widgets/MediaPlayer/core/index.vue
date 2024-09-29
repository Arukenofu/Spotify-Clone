<script setup lang="ts">
import {onMounted} from "vue";
import {useCurrentMusicStore, useMusicStore} from "@/features/MediaPlayer";
import TrackDetails from "@/widgets/MediaPlayer/components/TrackDetails.vue";
import TrackControls from "@/widgets/MediaPlayer/components/TrackControls.vue";
import AdditionalControls from "@/widgets/MediaPlayer/components/AdditionalControls.vue";

const musicStore = useMusicStore();
const currentMusicStore = useCurrentMusicStore();

onMounted(() => {
  musicStore.audio = new Audio(currentMusicStore.currentAudioData.url);
});

</script>

<template>
  <div class="player" v-if="musicStore.audio">
    <TrackDetails />

    <TrackControls />

    <AdditionalControls />
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

:deep(.icon) {
  height: 100%;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
  background: none;
  border: none;
  fill: var(--text-soft);

  &:hover, &:active {
    fill: var(--white);
  }

  svg {
    height: 16px;
    aspect-ratio: 1/1;
  }
}
</style>