<script setup lang="ts">
import LazyImage from "@/UI/Elements/LazyImage.vue";
import NoMusicOrPlaylistAvatar from '@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue';
import NoFolderAvatar from '@/UI/Icons/Shared/NoFolderAvatar.vue';
import NoArtistAvatar from "@/UI/Icons/Shared/NoArtistAvatar.vue";
import type { Entities } from '@/services/types/Entities';
import type { Component } from 'vue';

interface Props {
  image?: string | null,
  type: Entities | 'Folder',
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

    <NoArtistAvatar v-else-if="type === 'Artist'" class="image" draggable="false" />

    <NoMusicOrPlaylistAvatar
      v-else
      class="icon"
    />

    <slot />
  </Component>
</template>

<style scoped lang="scss">
.v-picture {
  border-radius: 4px;
  aspect-ratio: 1/1;
  background-color: #333333;
  display: grid;
  place-items: center;
  z-index: 1;

  .image {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: inherit;
  }

  .icon {
    height: 50%;
    width: 50%;
    fill: var(--text-soft);
    background-color: #333333;
  }
}
</style>