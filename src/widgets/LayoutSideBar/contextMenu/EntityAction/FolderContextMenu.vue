<script setup lang="ts">
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import PencilIcon from "@/UI/Icons/Shared/PencilIcon.vue";
import DangerIcon2 from "@/UI/Icons/Shared/DangerIcon2.vue";
import PlusMusicIcon from "@/UI/Icons/Shared/PlusMusicIcon.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import FolderIcon from "@/UI/Icons/Shared/FolderIcon.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import WithSubtree from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/WithSubtree.vue";

defineProps<EntityActionContextMenuProps>();
</script>

<template>
  <BasicContextMenuItem>
    Переименовать
    <template #icon>
      <PencilIcon />
    </template>
  </BasicContextMenuItem>
  <BasicContextMenuItem :svg-icon="DangerIcon2" underline>
    Удалить
    <template #icon>
      <DangerIcon2 />
    </template>
  </BasicContextMenuItem>
  <Pin :is-pinned="isPinned" :type="type" />
  <BasicContextMenuItem>
    Создать плейлист

    <template #icon>
      <PlusMusicIcon />
    </template>
  </BasicContextMenuItem>
  <BasicContextMenuItem>
    Создать папку

    <template #icon>
      <PlusIcon />
    </template>
  </BasicContextMenuItem>
  <WithSubtree>
    <BasicContextMenuItem>
      Переместить

      <template #icon>
        <FolderIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template #context>
    </template>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>