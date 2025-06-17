import type { FormatTypes } from '#imports'
import { type Component, computed, reactive } from 'vue'
import { useSidebarWidth } from '@/features/MedialibSidebar/composables/useSidebarWidth.ts'
import Compact from '@/features/MedialibSidebar/Formats/Compact.vue'
import Grid from '@/features/MedialibSidebar/Formats/Grid.vue'
import List from '@/features/MedialibSidebar/Formats/List.vue'
import useCachedRef from '@/shared/composables/useCachedRef'

const currentComponentName = useCachedRef<FormatTypes>('format', 'Grid', {
  expectedTypes: ['string'],
  expectedValues: ['Compact', 'Grid', 'List'],
})

export function useMedialibFormat() {
  const sidebar = reactive(useSidebarWidth())

  const MedialibComponent = computed<Component>(() => {
    if (sidebar.isMinimized) {
      return Grid
    }

    if (currentComponentName.value === 'Grid') {
      return Grid
    }

    if (currentComponentName.value === 'Compact') {
      return Compact
    }

    return List
  })

  function setComponent(name: FormatTypes) {
    currentComponentName.value = name
  }

  const getComponentName = computed(() => {
    return currentComponentName.value
  })

  return {
    component: MedialibComponent,
    name: getComponentName,
    setComponent,
  }
}
