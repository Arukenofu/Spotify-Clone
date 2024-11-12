<script setup lang="ts">
import PlaylistContextMenu from "@/widgets/LayoutSideBar/contextMenu/entityAction/PlaylistContextMenu.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar";

interface Props {
  type: MediaLibEntityProps['type']
}
defineProps<Props>();
</script>

<template>
  <PlaylistContextMenu v-if="type === 'Playlist'" />
</template>

<style scoped lang="scss">

</style>