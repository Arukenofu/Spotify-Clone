<script setup lang="ts">
import {AddToMedialibState, AddToPlaylist, Share} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";
import {useQueryClient} from "@tanstack/vue-query";

defineProps<EntityActionContextMenuProps & {
  type: 'Album'
}>();

const queryClient = useQueryClient();
</script>

<template>
  <AddToMedialibState state underline @click="removeEntityFromMedialib(id, queryClient, type)" />

  <Pin :id="id" type="Album" :is-pinned="isPinned" />

  <AddToPlaylist />

  <Share :type="type" />
</template>

<style scoped lang="scss">

</style>