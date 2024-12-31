<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
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