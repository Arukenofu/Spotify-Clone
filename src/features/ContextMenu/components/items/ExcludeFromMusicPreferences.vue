<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import RoundCrossIcon from "@/UI/Icons/Shared/RoundCrossIcon.vue";
import ctxT from "../../helpers/ctx-t";

defineProps<BaseItemProps>();
</script>

<template>
  <BasicContextMenuItem>
    {{ctxT('excludeFromPreferences')}}
    <template #icon>
      <RoundCrossIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>