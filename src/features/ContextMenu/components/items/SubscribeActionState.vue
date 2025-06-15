<script setup lang="ts">
import type { BaseItemProps } from '@/features/ContextMenu/types/defaults/BaseItemProps'
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import CloseIcon from '@/shared/UI/Icons/CloseIcon.vue'
import SubscribeIcon from '@/shared/UI/Icons/SubscribeIcon.vue'
import ctxT from '../../helpers/ctx-t'

defineProps<BaseItemProps & {
  state: boolean
}>()
</script>

<template>
  <BasicContextMenuItem :active="state && 'active-icon'">
    {{ state ? ctxT('unsubscribe') : ctxT('subscribe') }}
    <template #icon>
      <CloseIcon v-if="state" />
      <SubscribeIcon v-else />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
