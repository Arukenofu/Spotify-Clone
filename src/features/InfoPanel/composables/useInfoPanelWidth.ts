import { onMounted, watch } from 'vue'
import defaultWidth from '@/features/InfoPanel/constants/defaultWidth'
import max from '@/features/InfoPanel/constants/max'
import min from '@/features/InfoPanel/constants/min'
import useCachedRef from '@/shared/composables/useCachedRef'

const currentPanelWidth = useCachedRef<number>('infoContentWidth', defaultWidth, {
  expectedTypes: ['number'],
  min,
  max,
})

export default function () {
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
