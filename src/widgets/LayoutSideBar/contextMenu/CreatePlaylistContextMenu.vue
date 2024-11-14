<script setup lang="ts">
import Folder from '@/UI/Icons/Shared/FolderIcon.vue';
import {BasicContextMenuItem, BasicContextMenuView, CreatePlaylist} from "@/features/ContextMenu";
</script>

<template>
  <BasicContextMenuView>
    <CreatePlaylist />
    <BasicContextMenuItem>
      Создать папку с плейлистами
      <template #icon>
        <Folder />
      </template>
    </BasicContextMenuItem>
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
