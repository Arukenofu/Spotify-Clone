<script setup lang="ts">
import type { BaseItemProps } from '@/features/ContextMenu/types/defaults/BaseItemProps'
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import RoundCrossIcon from '@/shared/UI/Icons/RoundCrossIcon.vue'
import ctxT from '../../helpers/ctx-t'

defineProps<BaseItemProps>()
</script>

<template>
  <BasicContextMenuItem>
    {{ ctxT('excludeFromPreferences') }}
    <template #icon>
      <RoundCrossIcon />
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
