<script setup lang="ts">
import {
  AddToMedialibState,
  AddToProfileState,
  CreateFolder,
  CreatePlaylist,
  ExcludeFromMusicPreferences,
  MoveTo,
  Share
} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";
import {useQueryClient} from "@tanstack/vue-query";

defineProps<EntityActionContextMenuProps & {
  type: 'Playlist'
}>();

const queryClient = useQueryClient();
</script>

<template>
  <AddToProfileState state />

  <AddToMedialibState state underline @click="removeEntityFromMedialib(id, queryClient, type)" />

  <CreatePlaylist />

  <CreateFolder />

  <ExcludeFromMusicPreferences />

  <MoveTo />

  <Pin :id="id" type="Folder" :is-pinned="isPinned" underline />

  <Share :entity-id :type />
</template>

<style scoped lang="scss">

</style>