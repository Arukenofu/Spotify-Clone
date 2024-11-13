<script setup lang="ts">
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import PlusMusicIcon from "@/UI/Icons/Shared/PlusMusicIcon.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import RoundCrossIcon from "@/UI/Icons/Shared/RoundCrossIcon.vue";
import FolderIcon from "@/UI/Icons/Shared/FolderIcon.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import WithSubtree from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/WithSubtree.vue";
import RoundAvatarIcon from "@/UI/Icons/Shared/RoundAvatarIcon.vue";
import RoundCheckIcon from "@/UI/Icons/Shared/RoundCheckIcon.vue";
import Share from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Share.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";

defineProps<EntityActionContextMenuProps>();
</script>

<template>
  <BasicContextMenuItem>
    Добавить в профиль
    <template #icon>
      <RoundAvatarIcon />
    </template>
  </BasicContextMenuItem>

  <BasicContextMenuItem underline>
    Удалить из медиетеки
    <template #icon>
      <RoundCheckIcon achieve="yes" />
    </template>
  </BasicContextMenuItem>

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

  <BasicContextMenuItem>
    Исключить из музыкальных предпочтений
    <template #icon>
      <RoundCrossIcon />
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

  <Pin type="Folder" :is-pinned="isPinned" underline />

  <Share />
</template>

<style scoped lang="scss">

</style>