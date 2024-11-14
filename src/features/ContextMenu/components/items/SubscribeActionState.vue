<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import SubscribeIcon from "@/UI/Icons/Shared/SubscribeIcon.vue";

defineProps<BaseItemProps & {
  state: boolean
}>();
</script>

<template>
  <BasicContextMenuItem :active="state && 'active-icon'">
    {{state ? 'Отписаться' : 'Подписаться'}}
    <template #icon>
      <CloseIcon v-if="state" />
      <SubscribeIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>