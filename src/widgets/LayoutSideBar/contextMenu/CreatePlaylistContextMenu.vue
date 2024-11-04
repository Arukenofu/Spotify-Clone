<script setup lang="ts">
import PlusMusic from '@/UI/Icons/Shared/PlusMusic.vue';
import Folder from '@/UI/Icons/Shared/Folder.vue';
import BasicContextMenuView from "@/UI/ContextMenu/BasicContextMenuView.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
</script>

<template>
  <BasicContextMenuView>
    <BasicContextMenuItem
      :svg-icon="PlusMusic"
      text="Создать плейлист"
    />
    <BasicContextMenuItem
      :svg-icon="Folder"
      text="Создать папку с плейлистами"
    />
  </BasicContextMenuView>
</template>

<style lang="scss" scoped></style>
