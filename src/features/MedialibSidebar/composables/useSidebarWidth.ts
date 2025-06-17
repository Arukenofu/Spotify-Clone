import { computed, watch } from 'vue'
import useCachedRef from '@/shared/composables/useCachedRef.ts'

const defaultWidth = window.innerWidth * 0.3
const minimalWidth = 285
const maximalWidth = defaultWidth

const width = useCachedRef<number>('currentWidth', defaultWidth)

function useSidebarWidth() {
  const isMinimized = computed(() => {
    return width.value <= 72
  })

  function setStyleWidth(value: number) {
    document.documentElement.style.setProperty('--sidebar-width', `${value}`)
  }

  watch(width, (value) => {
    setStyleWidth(value)
  }, { immediate: true })

  return {
    isMinimized,
    width,
    defaultWidth,
    minimalWidth,
    maximalWidth,
  }
}

export { useSidebarWidth }
