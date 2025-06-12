<script setup lang="ts">
import {computed} from 'vue';
import getActiveColor from '@/shared/utils/getActiveColor';
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString';
import PlayingState from '@/shared/UI/Icons/PlayingState.vue';
import {useI18n} from "vue-i18n";
import type {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import {currentTrackImage} from "@/features/MediaPlayer";
import type {PlayerTypes} from "@/features/MediaPlayer/types/PlayerTypes";

const props = defineProps<{
  playback: PlayerTypes,
  music: Track | SimplifiedTrack;
  state: boolean;
}>();

defineEmits(['onImageBlockClick']);

const {t} = useI18n();

const playingStateTooltip = computed(() => {
  const musicName = props.music.name;
  const artists = getCommaSeparatedString(props.music.artists!, 'name');

  const action = props.state ? 'pause' : 'play';

  return t(`music-actions.${action}TrackByArtist`, [musicName, artists])
});

const currentImage = computed(() => {
  return currentTrackImage(props.playback, props.music)
});
</script>

<template>
  <div class="musicBlock">
    <div
      v-tooltip="playingStateTooltip"
      class="image-block"
      @click="$emit('onImageBlockClick')"
    >
      <PlayingState
        :state="state"
        class="icon"
      />

      <div
        class="image"
        :style="`background-image: url('${currentImage}')`"
      />
    </div>

    <div class="added-at">
      <div
        class="title"
        :style="getActiveColor(state, 'color')"
      >
        {{ music.name }}
      </div>
      <div class="artists">
        <RouterLink
          v-for="(artist, index) in music.artists"
          :key="artist.id"
          class="artist"
          :to="`/artist/${artist.id}`"
        >
          <span>
            {{ artist.name }}
          </span>
          <template v-if="index !== music.artists?.length - 1">, </template>
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

  &:hover,
  &:active {
    background-color: #1c1c1c;

    .image-block {
      .image {
        filter: brightness(0.5);
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
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 0.75 !important;
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

  .added-at {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    line-height: 1;

    .title {
      font-size: 1em;
    }

    .artists {
      a,
      span {
        font-size: 0.9em;
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
