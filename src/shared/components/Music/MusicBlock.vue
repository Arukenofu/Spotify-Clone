<script setup lang="ts">
import type {Music} from "@/shared/models/Music";
import PlayingState from "@/UI/Icons/Shared/PlayingState.vue";
import {computed} from "vue";
import {useMusicStore, useMusicUtils} from "@/features/MediaPlayer";
import {storeToRefs} from "pinia";
import getActiveColor from "@/shared/utils/getActiveColor";
import getCommaSeparatedString from "@/shared/utils/getCommaSeparatedString";

const props = defineProps<{
  music: Music
}>();

const store = useMusicStore();
const {currentAudioId, isPlaying} = storeToRefs(store);

const {toggleTrackPlaying, loadSong} = useMusicUtils();

const isCurrent = computed(() => {
  return currentAudioId.value === props.music.id;
});

function toggleMusic() {
  if (isCurrent.value) {
    toggleTrackPlaying();
  } else {
    loadSong(props.music);
  }
}

const playingStateTooltip = computed(() => {
  const musicName = props.music.name;
  const artists = getCommaSeparatedString(props.music.artists, 'name');

  if (isCurrent.value && isPlaying.value) {
    return `Поставить на паузу то, что сейчас играет «${musicName}» (${artists})`
  } else {
    return `Включить трек «${musicName}» исполнителя ${artists}`
  }
})

</script>

<template>
  <div class="musicBlock">
    <div class="image-block" @click="toggleMusic()"  v-tooltip="playingStateTooltip">
      <PlayingState
          :state="isCurrent && isPlaying"
          class="icon"
      />

      <div class="image" :style="`background-image: url('${music.avatar}')`" />
    </div>

    <div class="text">
      <div class="title" :style="getActiveColor(isCurrent, 'color')">
        {{music.name}}
      </div>
      <div class="artists">
        <RouterLink
            class="artist"
            v-for="(artist, index) in music.artists"
            :key="artist.id"
            :to="`/artist/${artist.url}`"
        >
            <span>
              {{artist.name}}
            </span>
          <template v-if="index !== music.artists.length - 1">, </template>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.musicBlock {
  height: 64px;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;

  &:hover, &:active {
    background-color: #1c1c1c;

    .image-block {
      .image {
        filter: brightness(.5);
      }

      .icon {
        opacity: 1 !important;
      }
    }
  }

  .image-block {
    position: relative;
    height: 100%;
    aspect-ratio: 1/1;

    &:active .icon {
      transform: translate(-50%,-50%) scale(.9);
      opacity: .75 !important;
    }

    .image {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background-size: cover;
      background-position: center;
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: var(--white);
      width: 20px;
      height: 20px;
      z-index: 1 !important;
      opacity: 0;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    line-height: 1;

    .title {
      font-size: 1em;
    }

    .artists {

      a, span {
        font-size: .9em;
        color: var(--text-soft);
      }

      span:hover {
        text-decoration: underline;
        color: var(--white);
      }
    }
  }
}

</style>