<script setup lang="ts">
import type { BaseItemProps } from '@/features/ContextMenu/types/defaults/BaseItemProps'
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import PlusIcon from '@/shared/UI/Icons/PlusIcon.vue'
import ctxT from '../../helpers/ctx-t'

defineProps<BaseItemProps>()
</script>

<template>
  <BasicContextMenuItem>
    {{ ctxT('createFolder') }}

    <template #icon>
      <PlusIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
