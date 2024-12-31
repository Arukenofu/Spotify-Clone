<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import SubscribeIcon from "@/UI/Icons/Shared/SubscribeIcon.vue";
import ctxT from "../../helpers/ctx-t";

defineProps<BaseItemProps & {
  state: boolean
}>();
</script>

<template>
  <BasicContextMenuItem :active="state && 'active-icon'">
    {{state ? ctxT('unsubscribe') : ctxT('subscribe')}}
    <template #icon>
      <CloseIcon v-if="state" />
      <SubscribeIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>