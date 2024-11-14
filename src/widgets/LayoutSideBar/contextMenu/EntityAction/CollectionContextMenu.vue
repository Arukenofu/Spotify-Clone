<script setup lang="ts">
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";

defineProps<EntityActionContextMenuProps>();

</script>

<template>
  <Pin :id="id" type="Collection" :is-pinned="isPinned" />
</template>

<style scoped lang="scss">

</style>