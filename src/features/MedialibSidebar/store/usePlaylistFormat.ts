import { defineStore, storeToRefs } from 'pinia';
import { type Component, computed } from 'vue';

import Grid from '@/features/MedialibSidebar/Formats/Grid.vue';
import Compact from '@/features/MedialibSidebar/Formats/Compact.vue';
import List from '@/features/MedialibSidebar/Formats/List.vue';

import useCachedRef from '@/shared/composables/useCachedRef';
import formats from '../constants/formats';
import { useSidebarWidthStore } from '@/features/MedialibSidebar';
import type { FormatTypes } from '#imports';

const formatStore = defineStore('usePlaylistFormat', () => {
  const currentComponentName = useCachedRef<FormatTypes>('format', 'Grid', {
    expectedTypes: ['string'],
    expectedValues: formats
  });

  const { isMinimized } = useSidebarWidthStore();

  const currentComponent = computed<Component>(() => {
    if (isMinimized.value) {
      return Grid;
    }

    if (currentComponentName.value === 'Grid') {
      return Grid;
    }

    if (currentComponentName.value === 'Compact') {
      return Compact;
    }

    return List;
  });

  function setComponent(name: FormatTypes) {
    currentComponentName.value = name;
  }

  const getComponentName = computed(() => {
    return currentComponentName.value;
  });

  return {
    currentComponent,
    setComponent,
    getComponentName
  };
});

export default function () {
  const store = formatStore();
  const { currentComponent, getComponentName } = storeToRefs(store);
  const { setComponent } = store;

  return {
    currentComponent,
    setComponent,
    getComponentName
  };
}
