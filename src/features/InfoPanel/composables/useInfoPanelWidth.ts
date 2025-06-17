import { onMounted, watch } from 'vue'
import useCachedRef from '@/shared/composables/useCachedRef'

const defaultWidth = 380
export const maxWidth = 420
export const minWidth = 280

const currentPanelWidth = useCachedRef<number>('infoContentWidth', defaultWidth, {
  expectedTypes: ['number'],
  min: minWidth,
  max: maxWidth,
})

export function useInfoPanelWidth() {
  watch(currentPanelWidth, (value) => {
    document.documentElement.style.setProperty('--panel-width', `${value}`)
  })

  onMounted(() => {
    document.documentElement.style.setProperty('--panel-width', `${currentPanelWidth.value}`)
  })

  return {
    currentPanelWidth,
  }
}
