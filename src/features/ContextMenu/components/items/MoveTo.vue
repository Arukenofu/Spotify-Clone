<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import TriangleIcon from "@/shared/UI/Icons/TriangleIcon.vue";
import FolderIcon from "@/shared/UI/Icons/FolderIcon.vue";
import WithSubtree from "../helpers/WithSubtree.vue";
import ctxT from "../../helpers/ctx-t";
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem>
      {{ctxT('moveTo')}}
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