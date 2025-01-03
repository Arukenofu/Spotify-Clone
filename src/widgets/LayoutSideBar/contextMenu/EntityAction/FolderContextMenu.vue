<script setup lang="ts">
import {BasicContextMenuItem, CreateFolder, MoveTo, Remove} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import PencilIcon from "@/shared/UI/Icons/PencilIcon.vue";
import DangerIcon2 from "@/shared/UI/Icons/DangerIcon2.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import {useQueryClient} from "@tanstack/vue-query";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";
import {ref} from "vue";
import RenameFolderModal from "@/widgets/LayoutSideBar/contextMenu/EntityAction/modals/RenameFolderModal.vue";
import {useI18n} from "vue-i18n";

defineProps<EntityActionContextMenuProps>();

const queryClient = useQueryClient();

const isRenameModal = ref<boolean>(false);

const {t} = useI18n();
</script>

<template>
  <BasicContextMenuItem @click="isRenameModal = true">
    {{t('contextmenu-items.rename')}}
    <template #icon>
      <PencilIcon />
    </template>
  </BasicContextMenuItem>

  <Remove underline @click="removeEntityFromMedialib($props, queryClient)">
    {{t('contextmenu-items.remove')}}
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