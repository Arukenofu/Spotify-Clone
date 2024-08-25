<script setup lang="ts">

import NoMusicOrPlaylistAvatar from "@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue";
import PlayingState from "@/UI/Icons/Shared/PlayingState.vue";
import routerPushPrevent from "@/shared/utils/routerPushPrevent";

interface Props {
  albumId: number,
  type?: 'playlist' | 'artist',
  to: string,
  name: string,
  showName?: boolean,
  image?: string,
}

withDefaults(defineProps<Props>(), {
  type: 'playlist',
  showName: true
});


</script>

<template>
  <div class="card" @click="routerPushPrevent(`/${type}/${to}`);">
    <div class="image" :style="type === 'artist' && 'border-radius: 50%'">
      <img
          v-if="image"
          :src="image"
          :alt="name"
      >
      <NoMusicOrPlaylistAvatar
          v-else
          class="noImage"
      />

      <button
          @click.stop
          @mousedown.prevent
          v-tooltip="`Слушать плейлист «${name}»`"
      >
        <PlayingState class="icon" />
      </button>
    </div>

    <span v-if="showName">
      {{name}}
    </span>

    <div class="textInfo">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  row-gap: 6px;
  border-radius: 6px;
  padding-block: 12px;
  padding-inline: 12px;
  cursor: pointer;
  transition: all ease .1s;
  user-select: none;

  &:hover {
    background-color: var(--ui-highlight);

    button {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }

  &:active {
    background-color: var(--black);
  }

  .image {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: #333333;
    display: grid;
    place-items: center;
    border-radius: 6px;
    position: relative;
    margin-bottom: 3px;

    .noImage {
      width: 64px;
      height: 64px;
      fill: var(--white);
    }

    button {
      opacity: 0;
      position: absolute;
      right: 8px;
      bottom: 8px;
      height: 48px;
      width: 48px;
      background-color: var(--main-color);
      border: none;
      border-radius: 50%;
      box-shadow: 0 8px 8px rgba(0,0,0,.3);
      transition: all .2s ease-out;
      transform: translateY(8px);
      cursor: pointer;
      display: grid;
      place-items: center;

      &:hover {
        scale: 1.04;
        filter: brightness(1.2);
      }

      &:active {
        scale: 1 !important;
      }

      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  span {
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }

  .textInfo {
    line-height: 1.35;
    color: var(--text-soft);
    font-size: .875rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }
}
</style>