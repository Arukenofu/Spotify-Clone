<script setup lang="ts">
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import RoundCheckIcon from "@/UI/Icons/Shared/RoundCheckIcon.vue";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import WithSubtree from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/WithSubtree.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import Share from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Share.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";

defineProps<EntityActionContextMenuProps>();
</script>

<template>
  <BasicContextMenuItem>
    Удалить из медиатеки
    <template #icon>
      <RoundCheckIcon achieve="yes" />
    </template>
  </BasicContextMenuItem>

  <Pin :id="id" type="Album" :is-pinned="isPinned" />

  <WithSubtree>
    <BasicContextMenuItem underline>
      Добавить в плейлист
      <template #icon>
        <PlusIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>
  </WithSubtree>

  <Share />
</template>

<style scoped lang="scss">

</style>