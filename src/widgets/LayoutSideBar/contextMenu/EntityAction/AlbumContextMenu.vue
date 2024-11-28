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
  <AddToMedialibState state underline @click="removeEntityFromMedialib($props, queryClient)" />

  <Pin :id="id" type="Album" :is-pinned="isPinned" />

  <AddToPlaylist underline />

  <Share :entity-id :type />
</template>

<style scoped lang="scss">

</style>