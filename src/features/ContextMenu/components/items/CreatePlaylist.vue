<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import PlusMusicIcon from "@/shared/UI/Icons/PlusMusicIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import ctxT from "../../helpers/ctx-t";

defineProps<BaseItemProps>();
</script>

<template>
  <BasicContextMenuItem>
    {{ctxT('createPlaylist')}}
    <template #icon>
      <PlusMusicIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>