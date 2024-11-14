<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";
import RoundCrossIcon from "@/UI/Icons/Shared/RoundCrossIcon.vue";

defineProps<BaseItemProps>();
</script>

<template>
  <BasicContextMenuItem>
    Исключить из музыкальных предпочтений
    <template #icon>
      <RoundCrossIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>