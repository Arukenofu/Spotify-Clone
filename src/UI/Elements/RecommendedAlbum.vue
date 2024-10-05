<script setup lang="ts">
import PlayingState from '@/UI/Icons/Shared/PlayingState.vue';
import {
  useMusicStore,
  useMusicUtils,
  usePlaylistStore
} from '@/features/MediaPlayer';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import routerPushPrevent from '@/shared/utils/routerPushPrevent';

interface Props {
  id: number;
  albumName: string;
  avatar: string;
  href: string;
}

const props = defineProps<Props>();
const store = useMusicStore();

const { currentPlaylist, isPlaying, toggleTrackPlaying } = {
  ...storeToRefs(usePlaylistStore()),
  ...storeToRefs(store),
  ...useMusicUtils()
};

const isCurrentAlbum = computed(() => {
  return currentPlaylist.value?.id === props.id;
});

function onButtonClick() {
  if (!isCurrentAlbum.value) {
    return;
    // set new Playlist and Queue
  }

  toggleTrackPlaying();
}
</script>

<template>
  <div
    class="album"
    @click="routerPushPrevent(`/playlist/${href}`)"
  >
    <div
      class="avatar"
      :style="`background-image: url(${avatar})`"
    />
    <div class="other">
      <span class="album-name">
        {{ albumName }}
      </span>

      <button
        v-tooltip="isCurrentAlbum && isPlaying ? 'Пауза' : 'Слушать'"
        @click.stop="onButtonClick()"
      >
        <PlayingState
          :state="isCurrentAlbum && isPlaying"
          class="icon"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album {
  height: var(--album-item-height);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
  display: flex;

  .avatar {
    height: var(--album-item-height);
    aspect-ratio: 1/1;
    background-color: #ffffff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    background-position: center;
    background-size: cover;
  }

  .other {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 8px;

    span {
      user-select: none;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: 700;
      word-break: break-word;
      font-size: 1em;
    }

    button {
      $size: calc(var(--album-item-height) - 16px);
      opacity: 0;
      height: $size;
      width: $size;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin-right: 8px;
      background-color: var(--main-color);
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
      cursor: pointer;

      &:hover {
        scale: 1.05;
      }

      .icon {
        $icon-size: calc($size / 2);
        width: $icon-size;
        height: $icon-size;
      }
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    button {
      opacity: 1;
    }
  }
}
</style>
