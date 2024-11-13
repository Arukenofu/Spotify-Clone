<script setup lang="ts">
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";

defineProps<EntityActionContextMenuProps>();
</script>

<template>
  <Pin :type="type" :is-pinned="isPinned" />
</template>

<style scoped lang="scss">

</style>