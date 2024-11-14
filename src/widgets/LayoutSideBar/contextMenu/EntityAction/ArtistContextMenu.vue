<script setup lang="ts">
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import DangerIcon3 from "@/UI/Icons/Shared/DangerIcon3.vue";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import Share from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Share.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";

defineProps<EntityActionContextMenuProps>();
</script>

<template>
  <BasicContextMenuItem class="active-icon">
    Отписаться
    <template #icon>
      <CloseIcon />
    </template>
  </BasicContextMenuItem>

  <BasicContextMenuItem>
    Не включать треки этого исполнителя
    <template #icon>
      <DangerIcon3 />
    </template>
  </BasicContextMenuItem>

  <Pin :id="id" type="Artist" :is-pinned="isPinned" />

  <Share />
</template>

<style scoped lang="scss">

</style>