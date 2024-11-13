<script setup lang="ts">
import PlusMusic from '@/UI/Icons/Shared/PlusMusic.vue';
import Folder from '@/UI/Icons/Shared/FolderIcon.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
</script>

<template>
  <BasicContextMenuView>
    <BasicContextMenuItem>
      Создать плейлист
      <template #icon>
        <PlusMusic />
      </template>
    </BasicContextMenuItem>
    <BasicContextMenuItem>
      Создать папку с плейлистами
      <template #icon>
        <Folder />
      </template>
    </BasicContextMenuItem>
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
