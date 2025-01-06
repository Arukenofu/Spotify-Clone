<script setup lang="ts">
import Resizer from '@/shared/components/Resizer.vue';
import MediaLibrary from '@/widgets/LayoutSideBar/components/MediaLibrary.vue';
import {useSidebarWidthStore} from '@/features/MedialibSidebar';
import {onMounted, onUnmounted} from "vue";
import {defaultWidth, maximalWidth, minimalWidth} from "@/widgets/LayoutSideBar/constants/layoutWidth";

const { currentWidth } = useSidebarWidthStore();

function onMinimizeTooMany(newWidth: number, _: number, min: number) {
  if (newWidth < min / 2) {
    currentWidth.value = 72;
  }
}

function resizeEventHandler() {
  maximalWidth.value = window.innerWidth * .45;
  defaultWidth.value = window.innerWidth * .3;

  if (currentWidth.value > maximalWidth.value) {
    currentWidth.value = maximalWidth.value;
  }

  if (minimalWidth.value > defaultWidth.value) {
    currentWidth.value = 72;
  }
}
onMounted(() => {
  window.addEventListener('resize', resizeEventHandler);
});
onUnmounted(() => {
  window.removeEventListener('resize', resizeEventHandler);
});
</script>

<template>
  <aside class="medialib-sidebar">
    <MediaLibrary />
  </aside>
  <Resizer
    v-model:current-width="currentWidth"
    :min-width="minimalWidth"
    :max-width="maximalWidth"
    @custom-resize-event="onMinimizeTooMany"
  />
</template>

<style lang="scss" scoped>
.medialib-sidebar {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width-px);
  gap: var(--layout-gap);
  max-height: 100%;
}
</style>
