<script setup lang="ts">
import {BasicContextMenuItem, CreateFolder, MoveTo} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import PencilIcon from "@/UI/Icons/Shared/PencilIcon.vue";
import DangerIcon2 from "@/UI/Icons/Shared/DangerIcon2.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import {useQueryClient} from "@tanstack/vue-query";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";

defineProps<EntityActionContextMenuProps>();

const queryClient = useQueryClient();
</script>

<template>
  <BasicContextMenuItem>
    Переименовать
    <template #icon>
      <PencilIcon />
    </template>
  </BasicContextMenuItem>
  <BasicContextMenuItem :svg-icon="DangerIcon2" underline @click="removeEntityFromMedialib(id, queryClient, type)">
    Удалить
    <template #icon>
      <DangerIcon2 />
    </template>
  </BasicContextMenuItem>
  <Pin :id="id" :is-pinned="isPinned" :type="type" />

  <CreateFolder />

  <MoveTo />
</template>

<style scoped lang="scss">

</style>