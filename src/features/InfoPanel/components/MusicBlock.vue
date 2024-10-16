<script setup lang="ts">
import { computed } from 'vue';
import getActiveColor from '@/shared/utils/getActiveColor';
import getCommaSeparatedString from '@/shared/utils/getCommaSeparatedString';
import PlayingState from '@/UI/Icons/Shared/PlayingState.vue';
import type { Music } from '@/services/types/Music';

const props = defineProps<{
  music: Music;
  state: boolean;
}>();

defineEmits(['onImageBlockClick']);

const playingStateTooltip = computed(() => {
  const musicName = props.music.name;
  const artists = getCommaSeparatedString(props.music.artists!, 'name');

  if (props.state) {
    return `Поставить на паузу то, что сейчас играет «${musicName}» (${artists})`;
  } else {
    return `Включить трек «${musicName}» исполнителя ${artists}`;
  }
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
        :style="`background-image: url('${music.avatar}')`"
      />
    </div>

    <div class="text">
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
          <template v-if="index !== music.artists?.length || 1 - 1">, </template>
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
