<script setup lang="ts">
import { BasicContextMenuItem } from '@/features/ContextMenu'
import CheckedRoundCircleIcon from '@/shared/UI/Icons/CheckedRoundCircleIcon.vue'
import RoundPlusIcon from '@/shared/UI/Icons/RoundPlusIcon.vue'
import ctxT from '../../helpers/ctx-t'

interface Props {
  state: boolean
}

defineProps<Props>()
</script>

<template>
  <BasicContextMenuItem :active="state && 'active-icon'">
    <template #icon>
      <Component
        :is="state ? CheckedRoundCircleIcon : RoundPlusIcon"
      />
    </template>
    <template #default>
      {{ state ? ctxT('addToFavoriteTracks') : ctxT('removeFromFavoriteTracks') }}
    </template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
