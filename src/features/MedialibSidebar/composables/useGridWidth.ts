import useCachedRef from '@/shared/composables/useCachedRef'

export const minGridWidth = 85
export const maxGridWidth = 255

const currentWidth = useCachedRef('gridColumnWidth', 170, {
  expectedTypes: ['number'],
  min: minGridWidth,
  max: maxGridWidth,
})

export function useGridWidth() {
  function setGridWidth(value: number) {
    currentWidth.value = value
  }

  return {
    width: currentWidth,
    setGridWidth,
  }
}
