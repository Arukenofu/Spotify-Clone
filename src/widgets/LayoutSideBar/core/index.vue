<script setup lang="ts">
import Resizer from '@/shared/components/Resizer.vue';
import MediaLibrary from '@/widgets/LayoutSideBar/components/MediaLibrary.vue';
import { useSidebarWidthStore } from '@/features/FormatSidebarPlaylist';
import max from '@/widgets/LayoutSideBar/constants/max';
import min from '@/widgets/LayoutSideBar/constants/min';

const { currentWidth } = useSidebarWidthStore();

function onMinimizeTooMany(newWidth: number, max: number, min: number) {
  if (newWidth < min / 2) {
    currentWidth.value = 72;
  }
}
</script>

<template>
  <aside :style="`width: ${currentWidth}px;`">
    <MediaLibrary />
  </aside>
  <Resizer
    v-model:current-width="currentWidth"
    :min-width="min"
    :max-width="max"
    @custom-resize-event="onMinimizeTooMany"
  />
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: var(--layout-gap);
  max-height: 100%;
}
</style>
