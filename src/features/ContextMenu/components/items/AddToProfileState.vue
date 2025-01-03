<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import RoundAvatarIcon from "@/shared/UI/Icons/RoundAvatarIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import ctxT from "../../helpers/ctx-t";

defineProps<BaseItemProps & {
  state: boolean
}>();
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    {{state ? ctxT('removeFromProfile') : ctxT('addToProfile') }}
    <template #icon>
      <RoundAvatarIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>