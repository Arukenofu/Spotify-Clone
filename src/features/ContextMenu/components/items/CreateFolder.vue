<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import type {BaseItemProps} from "@/features/ContextMenu/types/defaults/BaseItemProps";

defineProps<BaseItemProps>();
</script>

<template>
  <BasicContextMenuItem>
    Создать папку

    <template #icon>
      <PlusIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>