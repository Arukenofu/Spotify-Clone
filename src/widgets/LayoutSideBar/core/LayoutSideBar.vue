<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { useSidebarWidth } from '@/features/MedialibSidebar/composables/useSidebarWidth.ts'
import Resizer from '@/shared/components/Resizer.vue'
import MediaLibrary from '@/widgets/LayoutSideBar/components/MediaLibrary.vue'

const sidebar = reactive(useSidebarWidth())

function onMinimizeTooMany(newWidth: number, _: number, min: number) {
  if (newWidth < min / 2) {
    sidebar.width = 72
  }
}

function resizeEventHandler() {
  sidebar.maximalWidth = window.innerWidth * 0.45
  sidebar.defaultWidth = window.innerWidth * 0.3

  if (sidebar.width > sidebar.maximalWidth) {
    sidebar.width = sidebar.maximalWidth
  }

  if (sidebar.minimalWidth > sidebar.defaultWidth) {
    sidebar.width = 72
  }
}
onMounted(() => {
  window.addEventListener('resize', resizeEventHandler)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeEventHandler)
})
</script>

<template>
  <aside class="medialib-sidebar">
    <MediaLibrary />
  </aside>
  <Resizer
    v-model:current-width="sidebar.width"
    :min-width="sidebar.minimalWidth"
    :max-width="sidebar.maximalWidth"
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
