import { computed, defineAsyncComponent, readonly } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import useCachedRef from '@/shared/composables/useCachedRef';
import type { Component } from 'vue';
import type { PanelsName } from '#imports';

const useInfoStore = defineStore('useInfoContentStore', () => {
  const currentPanelName = useCachedRef<PanelsName | null>('currentPanelName', null, {
    expectedTypes: ['string']
  });

  const currentPanelNamePrivate = readonly(currentPanelName);

  const currentPanelComponent = computed<Component | null>(() => {
    if (!currentPanelName.value) {
      return null;
    }

    return defineAsyncComponent({
      loader: () =>
        import(`@/features/InfoPanel/Panels/${currentPanelName.value}.vue`),
      onError: () =>
        currentPanelName.value = null,
    });
  });

  function removePanel() {
    currentPanelName.value = null;
  }

  function setNewPanel(
    componentName: PanelsName | null,
    allowToggle: boolean = true
  ) {
    if (allowToggle && componentName === currentPanelName.value) {
      currentPanelName.value = null;
      return;
    }
    currentPanelName.value = componentName;
  }

  return {
    currentPanelName: currentPanelNamePrivate,
    currentPanelComponent,
    setNewPanel,
    removePanel
  };
});

export default function () {
  const { setNewPanel, removePanel } = useInfoStore();

  return {
    ...storeToRefs(useInfoStore()),
    setNewPanel,
    removePanel
  };
}
