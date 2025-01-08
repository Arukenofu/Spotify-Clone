<script setup lang="ts">
import LazyImage from "@/shared/UI/Elements/LazyImage.vue";
import NoMusicOrPlaylistAvatar from '@/shared/UI/Icons/NoMusicOrPlaylistAvatar.vue';
import NoFolderAvatar from '@/shared/UI/Icons/NoFolderAvatar.vue';
import NoArtistAvatar from "@/shared/UI/Icons/NoArtistAvatar.vue";
import LikedSongs from '@/assets/images/liked-songs.png';
import type {Component} from 'vue';
import NoUserAvatar from "@/shared/UI/Icons/NoUserAvatar.vue";
import type {ItemTypes} from "@spotify/web-api-ts-sdk";

interface Props {
  image?: string | null,
  type: ItemTypes | 'user' | 'Folder' | 'Collection',
  as?: Component | string,
  loading?: 'lazy' | 'eager',
  loadingColor?: string | null
}

defineProps<Props>();
</script>

<template>
  <Component
    :is="as ?? 'div'"
    class="v-picture"
    :class="type === 'artist' || type === 'user' ? 'round' : ''"
  >
    <LazyImage
      v-if="image"
      :image="image"
      :color="loadingColor"
      class="image"
    />

    <NoFolderAvatar
      v-else-if="type === 'Folder'"
      class="icon"
    />

    <NoUserAvatar v-else-if="type === 'user'" class="icon" draggable="false" />

    <NoArtistAvatar v-else-if="type === 'artist'" class="image" draggable="false" />

    <LazyImage v-else-if="type === 'Collection'" :image="LikedSongs" class="image" />

    <NoMusicOrPlaylistAvatar v-else class="icon" />

    <slot />
  </Component>
</template>

<style scoped lang="scss">
.v-picture {
  border-radius: 4px;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
  z-index: 1;
  background-color: #333333;

  .image {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: inherit;
  }

  .user {
    width: 64px;
    fill: var(--white);
  }

  .icon {
    height: 50%;
    width: 50%;
    fill: var(--text-soft);
    background-color: inherit;
  }
}

.round {
  border-radius: 50% !important;
}
</style>