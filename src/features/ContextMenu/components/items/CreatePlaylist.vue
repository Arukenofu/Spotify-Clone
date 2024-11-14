<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import PlusMusicIcon from "@/UI/Icons/Shared/PlusMusicIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";

defineProps<BaseItemProps>();
</script>

<template>
  <BasicContextMenuItem>
    Создать плейлист
    <template #icon>
      <PlusMusicIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>