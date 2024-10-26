<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import useMusicUtils from '@/features/MediaPlayer/composables/useMusicUtils';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';
import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';

const musicStore = useMusicStore();
const playlistStore = usePlaylistStore();
const currentStore = useCurrentMusicStore();
const { isPlaying } = storeToRefs(musicStore);

const { toggleTrackPlaying } = useMusicUtils();

const props = defineProps<{
  name: string;
  type: 'Трек' | 'Пользователь' | 'Плейлист' | 'Исполнитель';
  who: string;
  image: string;
  trackId: number;
  albumId: number;
}>();

const isCurrent = computed(() => {
  if (props.type === 'Трек') {
    return currentStore.currentAudioId === props.trackId;
  }

  return playlistStore.currentPlaylistInfo?.id === props.albumId;
});

function toggleMusic() {
  if (isCurrent.value) {
    toggleTrackPlaying();
  }
}
</script>

<template>
  <div class="best-result">
    <div class="title">
      Лучший результат
    </div>
    <div class="card">
      <div class="image-outer">
        <img
          :src="image"
          alt="Music Image"
          width="92px"
          height="92px"
        >
      </div>
      <div class="card-title">
        {{ name }}
      </div>
      <div class="info">
        <div class="type">
          {{ type + ' ' }}
        </div>
        <div class="name">
          {{ who }}
        </div>
      </div>

      <GreenPlayingButton
        v-if="type !== 'Пользователь'"
        class="playingState"
        :state="isCurrent && isPlaying"
        @click="toggleMusic()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.best-result {
  width: 35%;
  height: 230px;

  @container top-results (max-width: 1000px) {
    & {
      width: 50%;
    }
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .card {
    height: 100%;
    background-color: #181818;
    transition: background-color 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    padding: 20px;
    position: relative;

    img {
      border-radius: 4px;
      margin-bottom: 18px;
    }

    .card-title {
      font-size: 2rem;
      font-weight: 900;
    }

    .info {
      margin-top: 6px;
      display: flex;
      font-size: 0.85rem;

      .type {
        color: var(--text-soft);

        &::after {
          content: '•';
        }
      }

      .name {
        margin-left: 4px;
      }
    }

    .playingState {
      position: absolute;
      right: 24px;
      bottom: 24px;
      transform: translateY(8px);
      opacity: 0;
    }

    &:hover {
      background-color: #282828;

      .playingState {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
