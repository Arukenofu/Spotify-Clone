<script setup lang="ts">
import NoMusicOrPlaylistAvatar from '@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue';
import NoFolderAvatar from '@/UI/Icons/Shared/NoFolderAvatar.vue';
import type { Entities } from '@/shared/models/Entities';

interface Props {
  image: string | unknown,
  type?: Entities | 'Folder'
}

defineProps<Props>();
</script>

<template>
  <div class="v-picture">
    <div
      v-if="image"
      class="image"
    />

    <NoFolderAvatar
      v-else-if="type === 'Folder'"
      class="icon"
    />

    <NoMusicOrPlaylistAvatar
      v-else
      class="icon"
    />

    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-picture {
  border-radius: 4px;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
  background-color: #333333;
  z-index: 1;

  .image {
    width: 100%;
    aspect-ratio: 1/1;
  }

  .icon {
    height: 50%;
    width: 50%;
    fill: var(--text-soft);
  }
}
</style>