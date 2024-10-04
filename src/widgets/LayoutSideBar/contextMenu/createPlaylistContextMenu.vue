<script setup lang="ts">
import {
  BasicContextMenuItem,
  BasicContextMenuView
} from '@/features/ContextMenu';

import PlusMusic from '@/UI/Icons/Shared/PlusMusic.vue';
import Folder from '@/UI/Icons/Shared/Folder.vue';
</script>

<template>
  <BasicContextMenuView>
    <BasicContextMenuItem :svg-icon="PlusMusic" text="Создать плейлист" />
    <BasicContextMenuItem
      :svg-icon="Folder"
      text="Создать папку с плейлистами"
    />
  </BasicContextMenuView>
</template>

<style scoped></style>
