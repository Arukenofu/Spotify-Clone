<script setup lang="ts">
import type { BaseItemProps } from '@/features/ContextMenu/types/defaults/BaseItemProps'
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import RoundCheckIcon from '@/shared/UI/Icons/RoundCheckIcon.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'
import ctxT from '../../helpers/ctx-t'

interface Props extends BaseItemProps {
  state: boolean
}

defineProps<Props>()
</script>

<template>
  <BasicContextMenuItem v-bind="$props">
    {{ state ? ctxT('removeFromMedialib') : ctxT('addToMedialib') }}
    <template #icon>
      <RoundCheckIcon v-if="state" achieve="yes" />
      <RoundPlusIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
