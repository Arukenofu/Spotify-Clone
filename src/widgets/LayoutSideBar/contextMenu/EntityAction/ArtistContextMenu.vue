<script setup lang="ts">
import type { EntityActionContextMenuProps } from '@/widgets/LayoutSideBar/types/EntityActionContextMenuProps'
import { useQueryClient } from '@tanstack/vue-query'
import { Share, SubscribeActionState } from '@/features/ContextMenu'
import Pin from '@/widgets/LayoutSideBar/contextMenu/EntityAction/components/Pin.vue'
import removeEntityFromMedialib from '@/widgets/LayoutSideBar/contextMenu/EntityAction/utils/removeEntityFromMedialib'

defineProps<EntityActionContextMenuProps & {
  type: 'Artist'
}>()

const queryClient = useQueryClient()
</script>

<template>
  <SubscribeActionState state @click="removeEntityFromMedialib($props, queryClient)" />

  <Pin :id="id" type="Artist" :is-pinned="isPinned" />

  <Share :entity-id :type />
</template>

<style scoped lang="scss">

</style>
