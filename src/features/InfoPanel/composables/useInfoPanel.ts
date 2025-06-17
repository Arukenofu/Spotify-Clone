import type { PanelsName } from '#imports'
import { type Component, defineAsyncComponent, readonly, shallowRef, watch } from 'vue'
import useCachedRef from '@/shared/composables/useCachedRef.ts'

const currentPanelName = useCachedRef<PanelsName | null>('currentPanelName', null, {
  expectedTypes: ['string'],
})

function useInfoPanel() {
  const Component = shallowRef<Component | null>(null)

  function setup(value: PanelsName | null) {
    if (!value) {
      Component.value = null
      return
    }

    Component.value = defineAsyncComponent({
      loader: () =>
        import(`@/features/InfoPanel/Panels/${value}.vue`),
      onError: () =>
        currentPanelName.value = null,
    })
  }

  watch(currentPanelName, setup, {
    immediate: true,
  })

  function removePanel() {
    currentPanelName.value = null
  }

  function setNewPanel(
    componentName: PanelsName | null,
    allowToggle: boolean = true,
  ) {
    if (allowToggle && componentName === currentPanelName.value) {
      currentPanelName.value = null
      return
    }
    currentPanelName.value = componentName
  }

  return {
    name: readonly(currentPanelName),
    open: setNewPanel,
    close: removePanel,
    Component,
  }
}

export { useInfoPanel }
