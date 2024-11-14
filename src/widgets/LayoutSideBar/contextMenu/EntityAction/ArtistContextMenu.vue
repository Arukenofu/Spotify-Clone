<script setup lang="ts">
import {Share, SubscribeActionState} from "@/features/ContextMenu";
import Pin from "@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue";
import type {EntityActionContextMenuProps} from "@/widgets/LayoutSideBar/types/EntityActionContextMenuProps";
import removeEntityFromMedialib from "@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib";
import {useQueryClient} from "@tanstack/vue-query";

defineProps<EntityActionContextMenuProps & {
  type: 'Artist'
}>();

const queryClient = useQueryClient();
</script>

<template>
  <SubscribeActionState state @click="removeEntityFromMedialib(id, queryClient, type)" />

  <Pin :id="id" type="Artist" :is-pinned="isPinned" />

  <Share :type />
</template>

<style scoped lang="scss">

</style>