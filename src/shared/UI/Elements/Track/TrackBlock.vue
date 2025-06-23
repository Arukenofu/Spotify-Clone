<script setup lang="ts">
import type { SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'
import type { PlayerTypes } from '@/features/MediaPlayer/types/PlayerTypes'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Tippy } from 'vue-tippy'
import { currentTrackImage } from '@/features/MediaPlayer'
import CommaSeparatedArtistsLink from '@/shared/components/Sugar/CommaSeparatedArtistsLink.vue'
import PlayingState from '@/shared/UI/Icons/PlayingState.vue'
import getActiveColor from '@/shared/utils/colors/getActiveColor'
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString'

const props = defineProps<{
  playback: PlayerTypes
  music: Track | SimplifiedTrack
  state: boolean
}>()

defineEmits(['onImageBlockClick'])

const { t } = useI18n()

const playingStateTooltip = computed(() => {
  const musicName = props.music.name
  const artists = getCommaSeparatedString(props.music.artists!, 'name')

  const action = props.state ? 'pause' : 'play'

  return t(`music-actions.${action}TrackByArtist`, [musicName, artists])
})

const currentImage = computed(() => {
  return currentTrackImage(props.playback, props.music)
})
</script>

<template>
  <div class="musicBlock">
    <Tippy
      :content="playingStateTooltip"
      class="image-block"
      @click="$emit('onImageBlockClick')"
    >
      <PlayingState :state="state" class="icon" />

      <div class="image" :style="`background-image: url('${currentImage}')`" />
    </Tippy>

    <div class="added-at">
      <div class="title" :style="getActiveColor(state, 'color')">
        {{ music.name }}
      </div>
      <div class="artists">
        <CommaSeparatedArtistsLink class="artist" :artists="music.artists" />
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
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: unset;
      word-break: break-all;
      overflow: hidden;
    }

    .artists {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: unset;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.9em;
      color: var(--text-soft) !important;
      line-height: 1.4;

      &:deep(.artist) {
        text-decoration-thickness: 1.1px;

        &:hover {
          color: var(--white);
        }
      }
    }
  }
}
</style>
