import { readonly } from 'vue'
import gridColumnMaxWidth from '@/features/MedialibSidebar/constants/gridColumnMaxWidth'
import gridColumnMinWidth from '@/features/MedialibSidebar/constants/gridColumnMinWidth'
import useCachedRef from '@/shared/composables/useCachedRef'

const currentWidth = useCachedRef('gridColumnWidth', 170, {
  expectedTypes: ['number'],
  min: gridColumnMinWidth,
  max: gridColumnMaxWidth,
})

export default function () {
  function setGridWidth(value: number) {
    currentWidth.value = value
  }

  return {
    gridWidth: readonly(currentWidth),
    setGridWidth,
  }
}
