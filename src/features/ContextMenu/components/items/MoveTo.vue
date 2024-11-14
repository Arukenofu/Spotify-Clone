<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import FolderIcon from "@/UI/Icons/Shared/FolderIcon.vue";
import WithSubtree from "../helpers/WithSubtree.vue";
</script>

<template>
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