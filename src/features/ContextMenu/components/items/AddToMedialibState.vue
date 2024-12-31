<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import RoundCheckIcon from "@/UI/Icons/Shared/RoundCheckIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";
import ctxT from "../../helpers/ctx-t";

interface Props extends BaseItemProps {
  state: boolean;
}

defineProps<Props>()
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    {{state ? ctxT('removeFromMedialib') : ctxT('addToMedialib')}}
    <template #icon>
      <RoundCheckIcon v-if="state" achieve="yes" />
      <RoundPlusIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>