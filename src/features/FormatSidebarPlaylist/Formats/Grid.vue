<script setup lang="ts">
import type {FormatProps} from "@/features/FormatSidebarPlaylist/types/FormatProps";
import NoMusicOrPlaylistAvatar from "@/UI/Icons/Shared/NoMusicOrPlaylistAvatar.vue";

defineProps<FormatProps>();

</script>

<template>
  <RouterLink :to="`/playlist/${to}`" class="block">
    <div class="picture">
      <div class="image" v-if="avatar" />
      <NoMusicOrPlaylistAvatar class="icon" v-else />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.block {
  display: block;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 4px;
  transition: background-color 0.2s;

  .picture {
    border-radius: calc(4px);
    width: 100%;
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
    background-color: #333333;

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
}
</style>