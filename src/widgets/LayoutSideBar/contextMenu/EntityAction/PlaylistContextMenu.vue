<script setup lang="ts">
import {
  AddToMedialibState,
  AddToProfileState,
  ChangeData,
  CreateFolder,
  CreatePlaylist,
  ExcludeFromMusicPreferences,
  MoveTo,
  Remove,
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
  <AddToProfileState state underline />

  <AddToMedialibState
    v-if="owner?.id && 'someones playlist'"
    state underline
    @click="removeEntityFromMedialib($props, queryClient)"
  />

  <template v-else>
    <Remove />

    <ChangeData underline />
  </template>

  <CreatePlaylist />

  <CreateFolder />

  <ExcludeFromMusicPreferences />

  <MoveTo />

  <Pin :id="id" type="Folder" :is-pinned="isPinned" underline />

  <Share :entity-id :type />
</template>

<style scoped lang="scss">

</style>