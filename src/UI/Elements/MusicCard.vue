<script setup lang="ts">
import NoMusicOrPlaylistAvatar from '@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue';
import NoUserAvatar from '@/UI/Icons/Shared/NoUserAvatar.vue';
import routerPushPrevent from '@/shared/utils/routerPushPrevent';
import GreenPlayingButton from '@/UI/Buttons/GreenPlayingButton.vue';

interface Props {
  albumId: number;
  type?: 'playlist' | 'artist' | 'user';
  to: string;
  name: string;
  showName?: boolean;
  image?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'playlist',
  showName: true
});
</script>

<template>
  <div class="card" @click="routerPushPrevent(`/${type}/${to}`)">
    <div class="image" :style="type === 'artist' && 'border-radius: 50%'">
      <img v-if="image" :src="image" :alt="name" />
      <NoMusicOrPlaylistAvatar
        v-else-if="type === 'playlist'"
        class="noImage"
      />

      <NoUserAvatar class="noImage" v-else />

      <GreenPlayingButton
        class="playingState"
        v-if="type !== 'user'"
        @click.stop
        @mousedown.prevent
        v-tooltip="`Слушать плейлист «${name}»`"
        :state="false"
      />
    </div>

    <span v-if="showName">
      {{ name }}
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
  transition: all ease 0.1s;
  user-select: none;

  &:hover {
    background-color: var(--ui-highlight);

    .image {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

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
    transition: all 0.2s ease-out;

    .noImage {
      width: 64px;
      height: 64px;
      fill: var(--white);
    }

    .playingState {
      opacity: 0;
      position: absolute;
      right: 8px;
      bottom: 8px;
      transition: all 0.2s ease-out;
      transform: translateY(8px);
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
    line-height: 1.1rem;
    max-height: 2.2rem;
    color: var(--text-soft);
    font-size: 0.875rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -moz-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
