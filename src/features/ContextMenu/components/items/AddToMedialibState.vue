<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import RoundCheckIcon from "@/UI/Icons/Shared/RoundCheckIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import RoundPlusIcon from "@/UI/Icons/Shared/RoundPlusIcon.vue";

interface Props extends BaseItemProps {
  state: boolean;
}

defineProps<Props>()
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    {{state ? 'Удалить из медиетеки' : 'Добавить в медиатеку'}}
    <template #icon>
      <RoundCheckIcon v-if="state" achieve="yes" />
      <RoundPlusIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>