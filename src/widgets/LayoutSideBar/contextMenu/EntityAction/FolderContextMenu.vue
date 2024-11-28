<script setup lang="ts">
import {BasicContextMenuItem, CreateFolder, MoveTo, Remove} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import PencilIcon from "@/UI/Icons/Shared/PencilIcon.vue";
import DangerIcon2 from "@/UI/Icons/Shared/DangerIcon2.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import {useQueryClient} from "@tanstack/vue-query";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";
import {ref} from "vue";
import RenameFolderModal from "@/widgets/LayoutSideBar/contextMenu/EntityAction/modals/RenameFolderModal.vue";

defineProps<EntityActionContextMenuProps>();

const queryClient = useQueryClient();

const isRenameModal = ref<boolean>(false);
</script>

<template>
  <BasicContextMenuItem @click="isRenameModal = true">
    Переименовать
    <template #icon>
      <PencilIcon />
    </template>
  </BasicContextMenuItem>

  <Remove underline @click="removeEntityFromMedialib($props, queryClient)">
    Удалить
    <template #icon>
      <DangerIcon2 />
    </template>
  </Remove>
  <Pin :id="id" :is-pinned="isPinned" :type="type" />

  <CreateFolder />

  <MoveTo />

  <RenameFolderModal :id="id" v-model="isRenameModal" :current-name="name" />
</template>

<style scoped lang="scss">

</style>