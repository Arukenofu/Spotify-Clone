<script setup lang="ts">
import BasicContextMenuItem from '@/features/ContextMenu/components/defaults/BasicContextMenuItem.vue'
import FolderIcon from '@/shared/UI/Icons/FolderIcon.vue'
import TriangleIcon from '@/shared/UI/Icons/TriangleIcon.vue'
import ctxT from '../../helpers/ctx-t'
import WithSubtree from '../helpers/WithSubtree.vue'
</script>

<template>
  <WithSubtree>
    <BasicContextMenuItem>
      {{ ctxT('moveTo') }}
      <template #icon>
        <FolderIcon />
      </template>
      <template #additionalIcon>
        <TriangleIcon />
      </template>
    </BasicContextMenuItem>

    <template #context />
  </WithSubtree>
</template>

<style scoped lang="scss">

</style>
