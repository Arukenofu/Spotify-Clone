<script setup lang="ts">
import type { EntityActionContextMenuProps } from '@/widgets/LayoutSideBar/types/EntityActionContextMenuProps'
import { type Component, computed } from 'vue'
import { BasicContextMenuView } from '@/features/ContextMenu'
import AlbumContextMenu from '@/widgets/LayoutSideBar/contextMenu/EntityAction/AlbumContextMenu.vue'
import ArtistContextMenu from '@/widgets/LayoutSideBar/contextMenu/EntityAction/ArtistContextMenu.vue'
import CollectionContextMenu from '@/widgets/LayoutSideBar/contextMenu/EntityAction/CollectionContextMenu.vue'
import FolderContextMenu from '@/widgets/LayoutSideBar/contextMenu/EntityAction/FolderContextMenu.vue'
import PlaylistContextMenu from '@/widgets/LayoutSideBar/contextMenu/EntityAction/PlaylistContextMenu.vue'

const props = defineProps<EntityActionContextMenuProps>()

const ContextMenuComponent = computed<Component>(() => {
  const map = {
    Album: AlbumContextMenu,
    Artist: ArtistContextMenu,
    Collection: CollectionContextMenu,
    Folder: FolderContextMenu,
    Playlist: PlaylistContextMenu,
  }

  return map[props.type]
})
</script>

<template>
  <BasicContextMenuView class="contextmenu">
    <ContextMenuComponent v-bind="props" />
  </BasicContextMenuView>
</template>

<style scoped lang="scss">
.contextmenu {
  min-width: 300px;
}
</style>
