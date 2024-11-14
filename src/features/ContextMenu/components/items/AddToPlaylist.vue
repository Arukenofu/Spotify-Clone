<script setup lang="ts">
import BasicContextMenuItem from "@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue";
import TriangleIcon from "@/UI/Icons/Shared/TriangleIcon.vue";
import PlusIcon from "@/UI/Icons/Shared/PlusIcon.vue";
import WithSubtree from "../helpers/WithSubtree.vue";
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem underline>
      Добавить в плейлист
      <template #icon>
        <PlusIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>