<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BasicContextMenuItem } from '@/features/ContextMenu'
import AlbumIcon from '@/shared/UI/Icons/AlbumIcon.vue'
import ctxT from '../../helpers/ctx-t'
</script>

<template>
  <BasicContextMenuItem :as="RouterLink" v-bind="$props">
    <template #icon>
      <AlbumIcon />
    </template>
    {{ ctxT('toTheAlbum') }}
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">

</style>
