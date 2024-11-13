<script setup lang="ts">
import PinIcon from "@/UI/Icons/Shared/PinIcon.vue";
import BasicContextMenuItem from "@/UI/ContextMenu/BasicContextMenuItem.vue";
import type {MediaLibEntityProps} from "@/features/MedialibSidebar";

interface Props {
  type: MediaLibEntityProps['type'],
  isPinned: boolean
}
defineProps<Props>();

function localizePinState(type: MediaLibEntityProps['type']) {
  if (type === 'Artist') {
    return 'исполнителя'
  }
  if (type === 'Folder') {
    return 'папку'
  }
  if (type === 'Playlist') {
    return 'плейлист'
  }
  if (type === 'Collection') {
    return 'плейлист'
  }
  if (type === 'Album') {
    return 'альбом'
  }
}
</script>

<template>
  <BasicContextMenuItem v-bind="$attrs" :class="isPinned && 'active-icon'">
    {{`${isPinned ? 'Открепить' : 'Закрепить'} ${localizePinState(type)}`}}
    <template #icon><PinIcon /></template>
  </BasicContextMenuItem>
</template>

<style scoped lang="scss">
</style>