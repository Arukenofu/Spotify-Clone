<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import TriangleIcon from "@/shared/UI/Icons/TriangleIcon.vue";
import PlusIcon from "@/shared/UI/Icons/PlusIcon.vue";
import WithSubtree from "../helpers/WithSubtree.vue";
import ctxT from "../../helpers/ctx-t";

defineProps<{
  underline?: boolean,
}>();
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem :underline>
      {{ctxT('addToPlaylist')}}
      <template #icon>
        <PlusIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>